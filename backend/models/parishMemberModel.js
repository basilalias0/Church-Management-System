
const mongoose = require('mongoose');

const parishMemberSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    role: { type: String, required: true },
});

const ParishMember = mongoose.model('ParishMember', parishMemberSchema);
module.exports = ParishMember;