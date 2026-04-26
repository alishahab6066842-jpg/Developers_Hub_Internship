const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    // We don't need a manual 'id' field; MongoDB provides '_id' automatically.
    
    name: {
        type: String,
        required: [true, "Product name is required"],
        trim: true
    },
    price: {
        type: Number,
        required: [true, "Price is required"]
    },
    category: {
        type: String,
        required: [true, "Category is required"],
        trim: true
    },
    image: {
        type: String, // This will be the URL (e.g., from Unsplash or your /public folder)
        required: [true, "Image URL is required"]
    },
    description: {
        type: String,
        required: [true, "Description is required"]
    },
    stock: {
        type: Number,
        default: 0
    },
    isFeatured: {
        type: Boolean,
        default: false // Set this to true for items you want on the Home Page
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Links this product to the User model
        required: true
    }

})

const Product = mongoose.model("Product", productSchema);
module.exports = Product;