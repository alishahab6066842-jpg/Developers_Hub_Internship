const express = require('express');
const router = express.Router();
const path = require('path');

// Home Page
router.get('/about', (req, res) => {
    res.render('about'); // Assuming you create an about.ejs
});

// // Product Listing Page
// router.get('/products', (req, res) => {
//     res.sendFile(path.join(__dirname, '../views/products.html'));
// });

// // Product Details Page
// router.get('/products/:id', (req, res) => {
//     res.sendFile(path.join(__dirname, '../views/details.html'));
// });

module.exports = router;