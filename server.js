const express = require('express');
const path = require('path');
require('dotenv').config();
const mongoose = require('mongoose');
const productRoutes = require('./routes/productRoutes');
const staticRoutes = require('./routes/staticRoutes'); // Keep if you have non-product pages
const cookieParser = require('cookie-parser'); 
const authRoutes = require('./routes/authRoutes'); 
import serverless from "serverless-http";


const app = express();

// 1. SETTINGS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// 2. MIDDLEWARES 
app.use(cookieParser()); 
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));


// 4. ROUTES
app.use('/', staticRoutes);   // For About, Contact, etc.
app.use('/', productRoutes);  // For Home, Products, Search and Details
app.use('/', authRoutes);       // For login/sign-up


let isConnected = false;

async function connectDB() {
  if (isConnected) return;

  await mongoose.connect(process.env.MONGO_URI);
  isConnected = true;
}

app.use(async (req, res, next) => {
  await connectDB(); // 🔥 ensures DB before every request
  next();
});


export const handler = serverless(app);