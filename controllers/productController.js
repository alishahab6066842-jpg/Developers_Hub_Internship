const Product = require('../models/Product');


// Fetch featured products for the Home Page
exports.getHomePage = async (req, res) => {
    try {
        console.log("DB readyState:", mongoose.connection.readyState);
        const featuredProducts = await Product.find({ isFeatured: true });
        console.log("SUCCESS: Data retrieved from DB");
        res.render('index', { 
            products: featuredProducts,
            user: req.user

        });
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
        // 1. Get page and limit from the URL (defaults: page 1, 6 products)
        const page = parseInt(req.query.page) || 1;
        const limit = 6; 
        const skip = (page - 1) * limit;

        // 2. Get total number of products to calculate total pages
        console.log("DB readyState:", mongoose.connection.readyState);
        const totalProducts = await Product.countDocuments();
        const totalPages = Math.ceil(totalProducts / limit);

        // 3. Fetch the products for the current page
        // .populate('seller', 'name') lets us see the seller's name instead of just their ID
        console.log("DB readyState:", mongoose.connection.readyState);
        const products = await Product.find()
            .populate('seller', 'name')
            .skip(skip)
            .limit(limit);

        // 4. Send everything to the EJS template
        res.render('products', {
            products,
            currentPage: page,
            totalPages,
            hasNextPage: page < totalPages,
            hasPrevPage: page > 1,
            nextPage: page + 1,
            prevPage: page - 1
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error loading products");
    }
};


// Search products by name or category
exports.searchProducts = async (req, res) => {
    try {
        const { q } = req.query;
        console.log("DB readyState:", mongoose.connection.readyState);
        const products = await Product.find({ 
            name: { $regex: q, $options: 'i' } 
        });

        // Add these defaults so the EJS template doesn't break
        res.render('products', { 
            products, 
            currentPage: 1, 
            totalPages: 1, 
            hasNextPage: false, 
            hasPrevPage: false,
            nextPage: null,
            prevPage: null
        });
    } catch (err) {
        res.status(500).send("Search Error");
    }
};

// Fetch single product details
exports.getProductDetails = async (req, res) => {
    try {
        // Find product by ID and get the seller's name
        console.log("DB readyState:", mongoose.connection.readyState);
        const product = await Product.findById(req.params.id).populate('seller', 'name');
        
        if (!product) {
            return res.status(404).send("Product not found");
        }

        res.render('details', { product }); 
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
};


exports.createProduct = async (req, res) => {
    try {
        const productData = {
            ...req.body,
            seller: req.user.id // req.user comes from the 'protect' middleware!
        };

        await Product.create(productData);
        res.redirect('/dashboard');
    } catch (err) {
        res.status(400).send("Error creating product.");
    }
};

// Add this to your productController.js
exports.getSellerDashboard = async (req, res) => {
    try {
        // Find products where the 'seller' field matches the ID of the logged-in user
        console.log("DB readyState:", mongoose.connection.readyState);
        const myProducts = await Product.find({ seller: req.user._id });

        res.render('seller-dashboard', { 
            products: myProducts,
            sellerName: req.user.name 
        });
    } catch (err) {
        res.status(500).send("Error loading dashboard");
    }
};