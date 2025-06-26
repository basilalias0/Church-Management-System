const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    transactionDate: { type: Date, required: true },
    category: { type: String, required: true },
    amount: { type: Number, required: true },
    description: { type: String, required: true },
    type: { type: String, enum: ['income', 'expense'], required: true },
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;