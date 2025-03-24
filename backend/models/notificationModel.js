const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String },
    message: { type: String },
    relatedId: { type: mongoose.Schema.Types.ObjectId },
    relatedModel: { type: String },
});

const Notification = mongoose.model('Notification', notificationSchema);
module.exports = Notification;