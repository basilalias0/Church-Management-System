const mongoose = require('mongoose');

const galleryItemSchema = new mongoose.Schema({
    type: { type: String, enum: ['Image', 'Video'], required: true },
    url: { type: String, required: true },
    description: { type: String },
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
});

const GalleryItem = mongoose.model('GalleryItem', galleryItemSchema);
module.exports = GalleryItem;