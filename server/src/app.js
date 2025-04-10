const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const experienceRoutes = require('./routes/experienceRoutes');
const errorMiddleware = require('./middleware/errorMiddleware');

dotenv.config();

const app = express();

// Middleware
app.use(cors()); 
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('BlueBook API Server is running');
});
app.use('/api/experiences', experienceRoutes);

// Error handling middleware
app.use(errorMiddleware);

// Database connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB connected');
})
.catch(err => {
  console.error('MongoDB connection error:', err);
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});