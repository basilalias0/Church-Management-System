const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: ['Admin', 'Normal User', 'Accountant', 'Guest User', 'Vicar'],
        default: 'Normal User',
    },
    profilePicture: { type: String },
    dateOfBirth: { type: Date },
    contactNumber: { type: String },
    address: { type: String },
    bloodType: { type: String },
    isBloodDonor: { type: Boolean, default: false },
    volunteer: { type: Boolean, default: false },
    familyUnitCode: { type: String },
    uniqueFamilyCode: { type: Number },
    isParishMember: { type: Boolean, default: false },
});

const User = mongoose.model('User', userSchema);
module.exports = User;