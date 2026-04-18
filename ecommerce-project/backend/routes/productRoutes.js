const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/', productController.getHomePage);
router.get('/products', productController.getAllProducts);
router.get('/search', productController.searchProducts);
router.get('/product/:id', productController.getProductDetails);

module.exports = router;