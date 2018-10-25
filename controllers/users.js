const userStore = require('../store').users;
const uuid = require('uuid');
const tokenizer = require('../tokenizer');


module.exports = {

        getAllStoreAttendants : (req, res) => {

            console.log(req.user);

            if(!req.user.isAdmin){
                return res.status(403).json({message : "Only Admin Has Priviledges"})
            }

            res.json(userStore.filter(u => !u.isAdmin));
            
        },

        loginUser : (req, res) =>{

            const currUser = userStore.find( u => u.name == req.body.name && u.password == req.body.password);
            
            tokenizer.createToken(currUser, res);
        },

        signUpStoreAttendant: (req, res) =>{
            
            const attendant = {
                id: uuid(),
                name: req.body.name,
                password: req.body.password,
                isAdmin: false
            }

             userStore.push(attendant);


             tokenizer.createToken(attendant, res);
        }
        ,

        signUpAdmin : (req, res) => {

            const admin = {
                id : uuid(),
                name : req.body.name,
                password : req.body.password,
                isAdmin : true
            }

            console.log(req.body);

            userStore.push(admin);

            tokenizer.createToken(admin , res);
        },

        addStoreAttendant : (req, res) => {

            if(!req.user.isAdmin){
                return res.json({message: "Only Admin Has Priviledges"})
            }
           const attendant = {
               id: uuid(),
               name: req.body.name,
               password: req.body.password,
               isAdmin: false,
           }


            userStore.push(attendant);

            res.json({message: "Added Successfully"})
        }

}