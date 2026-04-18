require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to MongoDB for seeding..."))
    .catch(err => console.error(err));

const sampleProducts = [
    {
        name: "Eco-Friendly Water Bottle",
        price: 25,
        category: "Lifestyle",
        image: "https://images.unsplash.com/photo-1602143301015-81216a695029",
        description: "Stainless steel, vacuum-insulated bottle that keeps drinks cold for 24 hours.",
        stock: 50,
        isFeatured: true
    },
    {
        name: "Wireless Noise-Cancelling Headphones",
        price: 199,
        category: "Electronics",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
        description: "Premium sound quality with active noise cancellation and 30-hour battery life.",
        stock: 12,
        isFeatured: true
    },
    {
        name: "Minimalist Wall Clock",
        price: 35,
        category: "Home Decor",
        image: "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c",
        description: "A sleek, silent wall clock perfect for modern offices or living rooms.",
        stock: 20,
        isFeatured: false
    },
   
    // --- ELECTRONICS ---
    {
        name: "Pro Gaming Mouse",
        price: 59,
        category: "Electronics",
        image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46",
        description: "High-precision optical sensor with customizable RGB lighting.",
        stock: 25,
        isFeatured: true
    },
    {
        name: "Mechanical Keyboard",
        price: 120,
        category: "Electronics",
        image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae",
        description: "Tactile blue switches with a solid aluminum frame.",
        stock: 10,
        isFeatured: true
    },
    {
        name: "Noise Cancelling Headphones",
        price: 250,
        category: "Electronics",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
        description: "Studio quality sound with active noise cancellation technology.",
        stock: 8,
        isFeatured: true
    },
    {
        name: "Portable Power Bank",
        price: 40,
        category: "Electronics",
        image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5",
        description: "20,000mAh capacity to charge your devices multiple times on the go.",
        stock: 40,
        isFeatured: false
    },

    // --- FASHION ---
    {
        name: "Classic Denim Jacket",
        price: 75,
        category: "Fashion",
        image: "https://images.unsplash.com/photo-1523205771623-e0faa4d2813d",
        description: "A timeless blue denim jacket with a comfortable regular fit.",
        stock: 15,
        isFeatured: false
    },
    {
        name: "Urban Canvas Backpack",
        price: 55,
        category: "Fashion",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62",
        description: "Water-resistant material with a dedicated 15-inch laptop sleeve.",
        stock: 20,
        isFeatured: true
    },
    {
        name: "Minimalist Leather Watch",
        price: 110,
        category: "Fashion",
        image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d",
        description: "Genuine leather strap with a scratch-resistant sapphire glass face.",
        stock: 12,
        isFeatured: false
    },
    {
        name: "Polarized Sunglasses",
        price: 30,
        category: "Fashion",
        image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f",
        description: "UV400 protection with a lightweight polycarbonate frame.",
        stock: 50,
        isFeatured: false
    },

    // --- HOME & LIFESTYLE ---
    {
        name: "Smart LED Desk Lamp",
        price: 45,
        category: "Home",
        image: "https://images.unsplash.com/photo-1534073828943-f801091bb18c",
        description: "Adjustable brightness and color temperature with touch control.",
        stock: 18,
        isFeatured: false
    },
    {
        name: "Ceramic Coffee Mug Set",
        price: 22,
        category: "Home",
        image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b",
        description: "Set of 4 matte finish mugs, microwave and dishwasher safe.",
        stock: 30,
        isFeatured: false
    },
    {
        name: "Scented Soy Candle",
        price: 15,
        category: "Home",
        image: "https://images.unsplash.com/photo-1603006905003-be475563bc59",
        description: "Lavender and vanilla scent with a 40-hour clean burn time.",
        stock: 100,
        isFeatured: false
    },
    {
        name: "Stainless Steel Water Bottle",
        price: 28,
        category: "Lifestyle",
        image: "https://images.unsplash.com/photo-1602143301015-81216a695029",
        description: "Double-walled insulation keeps drinks cold for 24 hours.",
        stock: 60,
        isFeatured: true
    },

    // --- FITNESS & ACCESSORIES ---
    {
        name: "Yoga Mat (Non-Slip)",
        price: 35,
        category: "Fitness",
        image: "https://images.unsplash.com/photo-1592432676554-21958269b61d",
        description: "Eco-friendly TPE material with excellent grip and cushioning.",
        stock: 25,
        isFeatured: false
    },
    {
        name: "Adjustable Dumbbells",
        price: 150,
        category: "Fitness",
        image: "https://images.unsplash.com/photo-1586401100295-7a8096fd231a",
        description: "Quick-adjust weight dial ranging from 5 to 25 lbs.",
        stock: 5,
        isFeatured: false
    },
    {
        name: "Leather Journal",
        price: 20,
        category: "Lifestyle",
        image: "https://images.unsplash.com/photo-1544816153-12ad5d714b21",
        description: "Handcrafted vintage style journal with unlined cream paper.",
        stock: 45,
        isFeatured: false
    }
];


const seedDB = async () => {
    try {
        await Product.deleteMany({}); // Clears existing products to avoid duplicates
        await Product.insertMany(sampleProducts);
        console.log("✅ Database Seeded with Sample Products!");
        process.exit();
    } catch (err) {
        console.error("❌ Seeding Error:", err);
        process.exit(1);
    }
};

seedDB();