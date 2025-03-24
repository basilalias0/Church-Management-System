const mongoose = require('mongoose');

const bloodDonorSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

const BloodDonor = mongoose.model('BloodDonor', bloodDonorSchema);
module.exports = BloodDonor;