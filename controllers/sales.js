const salesStore = require('../store').sales;
const uuid = require('uuid');

module.exports = {

        getAllSales : (req, res) => {
            if(!req.user.isAdmin){
                res.status(403).json({message: "Forbidden"})
            }
            res.json(salesStore);
        },

        getSale : (req, res) => {

            const { saleId } = req.params;
            const sale = salesStore.find(s => s.id == saleId)

            if(!req.user.isAdmin && req.user.id != sale.attendantId){
                res.status(403).json({message : "Forbidden"})
            }

            res.json(sale);

        },

        addSale : (req, res) => {

            if(req.user.isAdmin){
                res.status(403).json({message : "Only Attendant Has Priviledges"})
            }

            req.body.id = uuid();
            req.body.attendantId = req.user.id

            salesStore.push(req.body);

            res.json(salesStore);
        }

}