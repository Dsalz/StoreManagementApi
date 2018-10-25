const express = require('express');
const productsController = require('../controllers/products');
const salesController = require('../controllers/sales');
const usersController = require('../controllers/users');
const tokenizer = require("../tokenizer");

const router = express.Router();

router.post('/users/addAttendant', usersController.addStoreAttendant);

router.post('/users/attendantSignUp', usersController.signUpStoreAttendant);

router.post('/users/login', usersController.loginUser);

router.get('/users/storeAttendants' , tokenizer.verifyUserToken , usersController.getAllStoreAttendants);

router.get('/products', tokenizer.verifyUserToken , productsController.getAllProducts);

router.get('/products/:productId', tokenizer.verifyUserToken , productsController.getProduct);

router.post('/products', tokenizer.verifyUserToken , productsController.addProduct);

router.get('/sales', tokenizer.verifyUserToken , salesController.getAllSales);

router.get('/sales/:saleId', tokenizer.verifyUserToken , salesController.getSale);

router.post('/sales', tokenizer.verifyUserToken , salesController.addSale);



module.exports = router;

