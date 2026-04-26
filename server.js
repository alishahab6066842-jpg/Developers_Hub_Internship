const express = require('express');
const path = require('path');
require('dotenv').config();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const serverless = require('serverless-http');

// Routes
const productRoutes = require('./routes/productRoutes');
const staticRoutes = require('./routes/staticRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

/* =========================
   VIEW ENGINE
========================= */
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

/* =========================
   MIDDLEWARES
========================= */
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

/* =========================
   MONGODB CONNECTION (Vercel SAFE)
========================= */
let isConnected = false;

async function connectDB() {
  if (isConnected) return;

  try {
    await mongoose.connect(process.env.MONGO_URI);
    isConnected = true;
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
  }
}

// Ensure DB connects before every request (serverless-safe)
app.use(async (req, res, next) => {
  if (!isConnected) {
    await connectDB();
  }
  next();
});

/* =========================
   ROUTES
========================= */
app.use('/', staticRoutes);
app.use('/', productRoutes);
app.use('/', authRoutes);

/* =========================
   EXPORT FOR VERCEL
========================= */
module.exports = app;
module.exports.handler = serverless(app);