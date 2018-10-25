const salesStore = require('../store').sales;
const productsController = require('./products');
const uuid = require('uuid');

module.exports = {

        getAllSales : (req, res) => {
            if(!req.user.isAdmin){
              return  res.status(403).json({message: "Forbidden"})
            }
            res.json(salesStore);
        },

        getSale : (req, res) => {

            const { saleId } = req.params;
            const sale = salesStore.find(s => s.id == saleId)

            if(!req.user.isAdmin && req.user.id != sale.attendantId){
              return  res.status(403).json({message : "Forbidden"})
            }

            res.json(sale);

        },

        addSale : (req, res) => {

            if(req.user.isAdmin){
               return res.status(403).json({message : "Only Attendant Has Priviledges"})
            }

            const sale = {
                id : uuid(),
                attendantId : req.user.id,
                cost : req.body.cost,
                products : req.body.products
            }

            salesStore.push(sale);

            productsController.updateStore(sale.products, res);
        },

        getAttendantSales : (req, res) =>{

            if(!req.user.isAdmin){
               return res.status(403).json({message : "Only Admin Has Priviledges"})
            }

            const { attendantId } = req.params;

            res.json(salesStore.filter( s => s.attendantId == attendantId))


        },

        getMySales : (req, res) =>{
            if(req.user.isAdmin){
                return res.status(403).json({message: "Only Attendant Has Priviledges"})
            }

            res.json(salesStore.filter( s => s.attendantId == req.user.id ))
        }

}