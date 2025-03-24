const mongoose = require('mongoose');

const financialTransactionSchema = new mongoose.Schema({
    type: { type: String, enum: ['Income', 'Expense'], required: true },
    category: { type: String },
    description: { type: String },
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    accountId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

const FinancialTransaction = mongoose.model('FinancialTransaction', financialTransactionSchema);
module.exports = FinancialTransaction;