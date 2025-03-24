const mongoose = require('mongoose');

const balanceSheetSchema = new mongoose.Schema({
    accountId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date },
    income: { type: Number },
    expenses: { type: Number },
    status: { type: String, enum: ['Pending', 'Approved', 'Rejected'] },
});

const BalanceSheet = mongoose.model('BalanceSheet', balanceSheetSchema);
module.exports = BalanceSheet;