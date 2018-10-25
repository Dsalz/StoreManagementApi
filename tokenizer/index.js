const jwt = require('jsonwebtoken');


const secretKey = process.env.SECRET_KEY || 'superSecretKey';

module.exports = {

    createToken : (user , res) => {

        jwt.sign( { user }, secretKey, {expiresIn : '2h'} , (err, token) => { 
            res.json({token , message:"Successful Signup"});
        });

    },

    verifyUserToken : (req, res, next) => {

        const token = req.headers.authorization || null;


        if(!token){
           return res.status(403).json({message : "Forbidden"})
        }

            jwt.verify(token.split(' ')[1] , secretKey , (err , authData) =>{
                if(err){
                   return res.status(403).json({message : "Invalid Token"})
                }

                req.user = authData.user;
                next();
            })
    }

}