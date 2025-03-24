const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
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
    photo: { type: String },
    familyMembers: [{
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        relation: { type: String, required: true }
    }],
    isVerified: { type: Boolean, default: false },
    isBloodDonor: { type: Boolean, default: false },
});

const User = mongoose.model('User', userSchema);
module.exports = User;