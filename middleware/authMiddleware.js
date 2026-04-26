const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
    const token = req.cookies.jwt;
    if (!token) return res.redirect('/login');

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Fetch the full user from the DB to get their current role
        const currentUser = await User.findById(decoded.id);
        if (!currentUser) return res.redirect('/login');

        req.user = currentUser; // Attach the full user object to the request
        next();
    } catch (err) {
        res.clearCookie('jwt');
        return res.redirect('/login');
    }
};

// New Middleware: Restrict access based on roles
const restrictTo = (...roles) => {
    return (req, res, next) => {
        // req.user was set by the 'protect' middleware above
        if (!roles.includes(req.user.role)) {
            return res.status(403).send("Access Denied: Only sellers can perform this action.");
        }
        next();
    };
};

module.exports = { protect, restrictTo };