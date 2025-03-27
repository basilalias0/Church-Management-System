const mongoose = require('mongoose');

const receiptSchema = new mongoose.Schema({
    transactionId: {
        type: String,
        required: true,
        unique: true,
    },
    receiptUrl: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    // Add any other relevant fields, like customer info, amount, etc.
});

const Receipt = mongoose.model('Receipt', receiptSchema);

module.exports = Receipt;