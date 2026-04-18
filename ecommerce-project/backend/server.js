const express = require('express');
const path = require('path');
require('dotenv').config();
const mongoose = require('mongoose');
const productRoutes = require('./routes/productRoutes');
const staticRoutes = require('./routes/staticRoutes'); // Keep if you have non-product pages

const app = express();

// 1. SETTINGS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// 2. MIDDLEWARES 

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// 3. DATABASE CONNECTION
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ MongoDB Connected Successfully!'))
    .catch(err => console.error('❌ MongoDB Connection Error:', err));

// 4. ROUTES
app.use('/', staticRoutes);   // For About, Contact, etc.
app.use('/', productRoutes);  // For Home, Products, Search, and Details

// 5. START SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});