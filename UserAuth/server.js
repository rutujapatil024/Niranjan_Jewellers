const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());         // ✅ Enable CORS before routes
app.use(express.json()); // ✅ Built-in JSON parser

// Routes
app.use('/api/auth', authRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!", error: err.message });
});

// Start Server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
