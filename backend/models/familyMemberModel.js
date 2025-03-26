const mongoose = require('mongoose');

const familyMemberSchema = new mongoose.Schema({
    creatorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // User who added the family member
    name: { type: String, required: true },
    relation: { type: String, required: true },
    occupation: { type: String },
    dateOfBirth: { type: Date },
    contactNumber: { type: String },
    familyUnitCode: { type: String, required: true }, // Family unit code
    uniqueFamilyCode: { type: Number, required: true }, // Unique family code
});

const FamilyMember = mongoose.model('FamilyMember', familyMemberSchema);
module.exports = FamilyMember;