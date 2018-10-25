const productStore = require('../store').products;
const uuid = require('uuid');

module.exports = {

        getAllProducts : (req, res) => {
            res.json(productStore);
        },

        getProduct : (req, res) => {

            const { productId } = req.params;

            res.json(productStore.find(p => p.id == productId));

        },

        addProduct : (req, res) => {

            req.body.id = uuid();

            productStore.push(req.body);

            res.json(productStore);
        }

}