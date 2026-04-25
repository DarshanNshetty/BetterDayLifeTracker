const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const localMongoUri = 'mongodb://127.0.0.1:27017/lifetracker';
const mongoUri = process.env.MONGODB_URI && !process.env.MONGODB_URI.includes('<db_password>')
    ? process.env.MONGODB_URI
    : localMongoUri;

mongoose.connect(mongoUri)
    .then(() => console.log(`MongoDB connected to ${mongoUri}`))
    .catch(err => console.error('MongoDB connection error:', err));

const auth = require('./routes/auth');
const categories = require('./routes/categories');
const entries = require('./routes/entries');
const dashboard = require('./routes/dashboard');

app.use('/api/auth', auth);
app.use('/api/categories', categories);
app.use('/api/entries', entries);
app.use('/api/dashboard', dashboard);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));