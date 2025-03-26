const mongoose = require('mongoose');

const virtualIDCardSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    age: { type: Number },
    uniqueID: { type: Number },
    photo: { type: String },
    contactNumber: { type: String },
});

const VirtualIDCard = mongoose.model('VirtualIDCard', virtualIDCardSchema);
module.exports = VirtualIDCard;