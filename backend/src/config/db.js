const mongoose = require('mongoose');
const dotenv = require('dotenv');

env = dotenv.config();
const uri = process.env.MONGO_URI;
if (!uri) {
    console.error('Missing MONGO_URI in .env');
    process.exit(1);
}

async function connectDB() {
    await mongoose.connect(uri);
    console.log('💾 MongoDB connected to', uri);
}

module.exports = connectDB;