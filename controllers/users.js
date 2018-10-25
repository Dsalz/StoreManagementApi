const userStore = require('../store').users;
const uuid = require('uuid');
const tokenizer = require('../tokenizer');


module.exports = {

        getAllStoreAttendants : (req, res) => {

            if(!req.user.isAdmin){
                res.status(403).json({message : "Only Admin Has Priviledges"})
            }

            res.json(userStore.filter(u => !u.isAdmin));
            
        },

        loginUser : (req, res) =>{

            const currUser = userStore.find( u => u.name == req.body.name && u.password == req.body.password);
            
            tokenizer.createToken(currUser, res);
        },

        signUpStoreAttendant: (req, res) =>{
            
            console.log(req.body);

            const attendant = {
                id: uuid(),
                name: req.body.name,
                password: req.body.password,
                isAdmin: false,
            }

             userStore.push(attendant);


             tokenizer.createToken(attendant, res);
        }
        ,
        addStoreAttendant : (req, res) => {

           const attendant = {
               id: uuid(),
               name: req.body.name,
               password: req.body.password,
               isAdmin: false,
           }


            userStore.push(attendant);

            tokenizer.createToken(attendant, res);
        }

}