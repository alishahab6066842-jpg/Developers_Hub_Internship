const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Helper function to create JWT
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '1d' // Token valid for 1 day
    });
};

// @desc    Register new user
// @route   POST /signup
exports.signup = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        console.log("DB readyState:", mongoose.connection.readyState);
        const user = await User.create({ name, email, password });
        const token = createToken(user._id);

        // Send token in HTTP-only cookie
        res.cookie('jwt', token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000 // 1 day in milliseconds
        });

        res.redirect('/'); // Redirect to home after successful signup
    } catch (err) {
        console.error(err);
        res.status(400).send('Error creating user. Email might already exist.');
    }
};

// @desc    Login user
// @route   POST /login
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        console.log("DB readyState:", mongoose.connection.readyState);
        const user = await User.findOne({ email });

        // 1. Check if user exists and password matches
        if (user && (await bcrypt.compare(password, user.password))) {
            const token = createToken(user._id);

            // 2. Set the cookie
            res.cookie('jwt', token, {
                httpOnly: true,
                maxAge: 24 * 60 * 60 * 1000
            });

            // 3. Decide where to send them and STOP (using return)
            if (user.role === 'seller') {
                return res.redirect('/dashboard');
            } else {
                return res.redirect('/'); 
            }
            
        } else {
            // 4. If credentials fail, STOP
            return res.status(401).send('Invalid email or password');
        }

    } catch (err) {
        console.error(err);
        // 5. Handle unexpected errors and STOP
        // Note: You can't send two responses (send and render), so we pick one.
        return res.status(400).render('login', { error: 'An error occurred during login.' });
    }
};

// @desc    Logout user
// @route   GET /logout
exports.logout = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 }); // Replace cookie with an empty string that expires instantly
    res.redirect('/login');
};