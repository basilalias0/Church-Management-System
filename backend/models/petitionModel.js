const mongoose = require('mongoose');

const petitionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    category: { type: String },
    title: { type: String, required: true },
    description: { type: String },
    status: { type: String, enum: ['Pending', 'Reviewed', 'Resolved'] },
});

const Petition = mongoose.model('Petition', petitionSchema);
module.exports = Petition;