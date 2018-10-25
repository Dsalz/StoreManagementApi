let productStore = require('../store').products;
const uuid = require('uuid');

module.exports = {

        getAllProducts : (req, res) => {
            res.json(productStore);
        },

        getProduct : (req, res) => {

            const { productId } = req.params;

            res.json(productStore.find(p => p.id == productId));

        },

        updateStore : (products , res) => {
            for(let { id , quantity} of products){
                let product = productStore.find( p => p.id == id)
                product.quantity -= quantity
            }

            res.json(productStore);
        },

        addProduct : (req, res) => {

            const product = {
                id : uuid(),
                name: req.body.name,
                price: Number(req.body.price),
                quantity : Number(req.body.quantity)
            }

            productStore.push(product);

            res.json(productStore);
        },
        deleteProduct : (req, res) => {
            const { productId } = req.params;

            productStore = productStore.filter( p => p.id !== productId);

            res.json(productStore)
        }

}