const Product = require('../models/Product');

// Fetch featured products for the Home Page
exports.getHomePage = async (req, res) => {
    try {
        const featuredProducts = await Product.find({ isFeatured: true });
        console.log("SUCCESS: Data retrieved from DB");
        res.render('index', { products: featuredProducts });
    } catch (err) {
        // This will print the exact reason (e.g., 'MongooseServerSelectionError')
        console.log("--- DEBUG START ---");
        console.error(err); 
        console.log("--- DEBUG END ---");
        
        // This sends the real error to your browser screen
        res.status(500).send(`Detailed Error: ${err.message}`);
    }
};

// Fetch all products for the Listing Page
exports.getAllProducts = async (req, res) => {
    try {
        const allProducts = await Product.find();
        res.render('products', { products: allProducts });
    } catch (err) {
        res.status(500).send("Error loading products");
    }
};

// Search products by name or category
exports.searchProducts = async (req, res) => {
    const query = req.query.q;
    try {
        const results = await Product.find({
            $or: [
                { name: { $regex: query, $options: 'i' } },
                { category: { $regex: query, $options: 'i' } }
            ]
        });
        res.render('products', { products: results });
    } catch (err) {
        res.status(500).send("Search failed");
    }
};

// Fetch single product details
exports.getProductDetails = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.render('product-details', { product });
    } catch (err) {
        res.status(404).send("Product not found");
    }
};