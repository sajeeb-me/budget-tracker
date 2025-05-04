require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');
const transactionRoutes = require('./routes/transaction.routes');
const errorHandler = require('./utils/errorHandler');

const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

connectDB().catch(err => {
    console.error('DB connection error:', err);
    process.exit(1);
});

app.get('/', (req, res) => {
    res.send('Welcome to the Transaction API');
});



app.use('/api/transactions', transactionRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`🚀 Server listening on port ${PORT}`);
});