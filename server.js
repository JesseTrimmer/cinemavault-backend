const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const entryRoutes = require('./routes/entryRoutes');
const personRoutes = require('./routes/personRoutes');
const groupRoutes = require('./routes/groupRoutes');

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/entries', entryRoutes);
app.use('/api/people', personRoutes);
app.use('/api/groups', groupRoutes);

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'CinemaVault API is running!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));