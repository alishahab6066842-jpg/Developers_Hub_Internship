const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { 
        type: String, 
        enum: ['user', 'seller', 'admin'], // Only these strings are allowed
        default: 'user' 
    }
});

// Hash password before saving to DB
// NEW WAY (Modern Mongoose)
userSchema.pre('save', async function() {
    if (!this.isModified('password')) return;
    
    this.password = await bcrypt.hash(this.password, 10);
    // No next() needed because the function is async!
});

module.exports = mongoose.model('User', userSchema);