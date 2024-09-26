const express = require('express');
const connectDB = require('./src/config/db'); // Your database connection logic
const jutsuRoutes = require('./src/routes/jutsuRoutes');
const ninjaRoutes = require('./src/routes/ninjaRoutes');
const empruntRoutes = require('./src/routes/empruntRoutes');
const errorHandler = require('./src/middleware/errorHandler');
require('dotenv').config();

const app = express();
app.use(express.json());

// Connect to MongoDB if not in the test environment
if (process.env.NODE_ENV !== 'test') {
  connectDB();
}

// API Routes
app.use('/api/jutsus', jutsuRoutes);
app.use('/api/ninjas', ninjaRoutes);
app.use('/api/emprunts', empruntRoutes);

// Global error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// Only start the server if not in the test environment
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
  });
}

module.exports = app; // Export the app for testing purposes
