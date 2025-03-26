const mongoose = require('mongoose');

const financialTransactionSchema = new mongoose.Schema({
    type: { type: String, enum: ['income', 'expense'], required: true },
    category: { type: String },
    description: { type: String },
    amount: { type: Number, required: true },
    transactionDate: { type: Date, default: Date.now },
});

const FinancialTransaction = mongoose.model('FinancialTransaction', financialTransactionSchema);
module.exports = FinancialTransaction;