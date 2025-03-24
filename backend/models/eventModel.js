const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    date: { type: Date, required: true },
    location: { type: String },
    images: { type: [String] },
});

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;