const express = require('express');
const path = require('path');
const app = express();

// Serve static assets from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Import our routes
const staticRoutes = require('./routes/staticRoutes');
app.use('/', staticRoutes);

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});