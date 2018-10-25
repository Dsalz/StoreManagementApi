const jwt = require('jsonwebtoken');


const secretKey = process.env.SECRET_KEY || 'superSecretKey';

module.exports = {

    createToken : (user , res) => {

        jwt.sign( { user }, secretKey, {expiresIn : '2h'} , (err, token) => { 
            res.json({token , message:"Successful Signup"});
        });

    },

    verifyUserToken : (req, res, next) => {

        const token = req.header.authorization || null;

        if(!token){
            res.status(403).json({message : "Forbidden"})
        }

        jwt.verify(token.split(' ')[1] , secretKey , (err , user) =>{
            if(err){
                res.status(403).json({message : "Invalid Token"})
            }

            req.user = user;
            next();
        })
    }

}