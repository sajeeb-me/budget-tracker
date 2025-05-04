const { Schema, model } = require('mongoose');

const TransactionSchema = new Schema({
    description: { type: String, required: true },
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now }
});

module.exports = model('Transaction', TransactionSchema);