require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Product = require('./models/Product');
const User = require('./models/User');

const seedDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB for seeding...");

        // 1. Clear existing data
        await User.deleteMany({});
        await Product.deleteMany({});
        console.log("Cleared old Users and Products.");

        // 2. Create Sellers
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('password123', salt);

        const sellerNames = ['Haider', 'Muddassir', 'Huzaifa', 'Talal'];
        const createdSellers = await User.insertMany(
            sellerNames.map(name => ({
                name,
                email: `${name.toLowerCase()}@test.com`,
                password: hashedPassword,
                role: 'seller'
            }))
        );
        console.log("Created 4 Sellers: Haider, Muddassir, Huzaifa, and Talal.");

        // 3. Define Products for each Seller
        const productsData = [
            // Haider's Products
            { name: "Gaming PC", price: 1200, category: "Tech", image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7", description: "High-end gaming rig.", seller: createdSellers[0]._id },
            { name: "RGB Mousepad", price: 25, category: "Tech", image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7", description: "Extra large RGB pad.", seller: createdSellers[0]._id },
            { name: "Monitor Arm", price: 45, category: "Tech", image: "https://images.unsplash.com/photo-1616440802323-91e02efd6b62", description: "Dual monitor mount.", seller: createdSellers[0]._id },
            { name: "Webcam 4K", price: 90, category: "Tech", image: "https://images.unsplash.com/photo-1612450796387-3a9d7cb14a50", description: "Ultra HD streaming cam.", seller: createdSellers[0]._id },
            { name: "USB Mic", price: 110, category: "Tech", image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc", description: "Cardioid condenser mic.", seller: createdSellers[0]._id },

            // Muddassir's Products
            { name: "Smart Watch", price: 199, category: "Electronics", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30", description: "Fitness and sleep tracker.", seller: createdSellers[1]._id },
            { name: "Power Bank", price: 40, category: "Electronics", image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5", description: "Fast charge 20k mAh.", seller: createdSellers[1]._id },
            { name: "Bluetooth Buds", price: 60, category: "Electronics", image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df", description: "Noise cancelling buds.", seller: createdSellers[1]._id },
            { name: "HDMI Cable", price: 15, category: "Electronics", image: "https://images.unsplash.com/photo-1629739683334-92e1f2b67f13", description: "Gold plated 4K cable.", seller: createdSellers[1]._id },
            { name: "Phone Stand", price: 10, category: "Electronics", image: "https://images.unsplash.com/photo-1586105251261-72a75665786b", description: "Adjustable desk stand.", seller: createdSellers[1]._id },

            // Huzaifa's Products
            { name: "Coffee Beans", price: 20, category: "Grocery", image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e", description: "Dark roast Arabica.", seller: createdSellers[2]._id },
            { name: "French Press", price: 35, category: "Kitchen", image: "https://images.unsplash.com/photo-1544190153-060cb6bb3a1f", description: "Stainless steel press.", seller: createdSellers[2]._id },
            { name: "Electric Kettle", price: 50, category: "Kitchen", image: "https://images.unsplash.com/photo-1594212699903-ec8a3ecc50f1", description: "Fast boil 1.7L.", seller: createdSellers[2]._id },
            { name: "Coffee Grinder", price: 30, category: "Kitchen", image: "https://images.unsplash.com/photo-1585515320310-259814833e62", description: "Manual burr grinder.", seller: createdSellers[2]._id },
            { name: "Ceramic Mug", price: 12, category: "Kitchen", image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd", description: "Handcrafted mug.", seller: createdSellers[2]._id },

            // Talal's Products
            { name: "Dumbbells 10kg", price: 40, category: "Fitness", image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61", description: "Rubber coated pair.", seller: createdSellers[3]._id },
            { name: "Yoga Mat", price: 25, category: "Fitness", image: "https://images.unsplash.com/photo-1592432678016-e910b452f9a2", description: "Non-slip eco-mat.", seller: createdSellers[3]._id },
            { name: "Resistance Bands", price: 15, category: "Fitness", image: "https://images.unsplash.com/photo-1598289431512-b97b0917a63e", description: "Set of 5 levels.", seller: createdSellers[3]._id },
            { name: "Protein Shaker", price: 10, category: "Fitness", image: "https://images.unsplash.com/photo-1610416801824-22b941579730", description: "BPA free 700ml.", seller: createdSellers[3]._id },
            { name: "Jump Rope", price: 12, category: "Fitness", image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438", description: "Speed skipping rope.", seller: createdSellers[3]._id }
        ];

        await Product.insertMany(productsData);
        console.log("Successfully added 20 products (5 per seller).");

        process.exit();
    } catch (err) {
        console.error("Seeding Error:", err);
        process.exit(1);
    }
};

seedDatabase();