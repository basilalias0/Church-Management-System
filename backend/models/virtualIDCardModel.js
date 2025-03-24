const mongoose = require('mongoose');

const virtualIDCardSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

const VirtualIDCard = mongoose.model('VirtualIDCard', virtualIDCardSchema);
module.exports = VirtualIDCard;