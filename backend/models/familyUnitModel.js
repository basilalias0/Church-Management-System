const mongoose = require('mongoose');

const familyUnitSchema = new mongoose.Schema({
    name: { type: String, required: true },
    shortCode: { type: String, required: true, unique: true },
});

const FamilyUnit = mongoose.model('FamilyUnit', familyUnitSchema);
module.exports = FamilyUnit;