const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { protect, restrictTo } = require('../middleware/authMiddleware');


// 1. Static/Specific Routes (Place these FIRST)
router.get('/', productController.getHomePage);
router.get('/products', productController.getAllProducts);
router.get('/search', productController.searchProducts);

// Move the dashboard here!
router.get('/dashboard', protect, restrictTo('seller'), productController.getSellerDashboard);

router.get('/add', protect, restrictTo('seller'), (req, res) => res.render('add-product'));
router.post('/add', protect, restrictTo('seller'), productController.createProduct);

// 2. Dynamic ID Routes (Place these LAST)
router.get('/products/:id', productController.getProductDetails);

module.exports = router;