const express = require('express');
const productsController = require('../controllers/products');
const salesController = require('../controllers/sales');
const usersController = require('../controllers/users');
const tokenizer = require("../tokenizer");

const router = express.Router();


// @route POST /api/v1/users/addAttendant/{attendant}
// @desc admin api endpoint for adding new store attendant
// @access Admin only
router.post('/users/addAttendant', tokenizer.verifyUserToken, usersController.addStoreAttendant);

// @route POST /api/v1/users/attendantSignUp/{attendant}
// @desc api endpoint for store attendant to sign up
// @access public
router.post('/users/attendantSignUp', usersController.signUpStoreAttendant);

// @route POST /api/v1/users/login/{user}
// @desc api endpoint for logging in store attendant and admin users
// @access public
router.post('/users/login', usersController.loginUser);

// @route POST /api/v1/users/adminSignUp/{admin}
// @desc api endpoint for signing up new admin
// @access (public for Testing Purposes)
// TO DO : remove end point and add admin users manually
router.post('/users/adminSignUp', usersController.signUpAdmin);

// @route GET /api/v1/users/storeAttendants
// @desc admin api endpoint for getting all store attendants
// @access Admin only
router.get('/users/storeAttendants' , tokenizer.verifyUserToken , usersController.getAllStoreAttendants);

// @route GET /api/v1/users/products
// @desc user api endpoint for getting all products in store
// @access user only
router.get('/products', tokenizer.verifyUserToken , productsController.getAllProducts);

// @route GET /api/v1/users//products/:productId
// @desc user api endpoint for getting specific product
// @access user only
router.get('/products/:productId', tokenizer.verifyUserToken , productsController.getProduct);

// @route POST /api/v1/users/products
// @desc admin api endpoint for adding product to store
// @access admin only
router.post('/products', tokenizer.verifyUserToken , productsController.addProduct);

// @route DELETE /api/v1/users/products/:productId
// @desc admin api endpoint for deleting product
// @access admin only
router.delete('/products/:productId', tokenizer.verifyUserToken , productsController.deleteProduct);

// @route GET /api/v1/sales
// @desc admin api endpoint for getting all sale records
// @access admin only
router.get('/sales', tokenizer.verifyUserToken , salesController.getAllSales);

// @route GET /api/v1/sales/:saleId
// @desc user api endpoint for getting specific sale record
// @access admin and store attendant who made specific sale record only
router.get('/sales/:saleId', tokenizer.verifyUserToken , salesController.getSale);

// @route GET /api/v1/sales/attendantsales/:attendantId
// @desc user api endpoint for getting sale records of specific attendant
// @access admin only
router.get('/sales/attendantsales/:attendantId', tokenizer.verifyUserToken , salesController.getAttendantSales);

// @route GET /api/v1/sales/attendantsales/:attendantId
// @desc user api endpoint for getting sale records of specific attendant
// @access store attendant who made specific sale record only
router.get('/sales/mysales', tokenizer.verifyUserToken , salesController.getMySales);

// @route POST /api/v1/sales
// @desc store attendant api endpoint for adding sale record
// @access store attendant only
router.post('/sales', tokenizer.verifyUserToken , salesController.addSale);



module.exports = router;

