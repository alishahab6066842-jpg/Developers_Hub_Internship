const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { protect, restrictTo } = require('../middleware/authMiddleware');
const productController = require('../controllers/productController');

// Render Pages
router.get('/signup', (req, res) => res.render('signup'));
router.get('/login', (req, res) => res.render('login'));

// Handle Logic
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.logout);




module.exports = router;