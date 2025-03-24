// galleryController.js
const GalleryItem = require('../models/galleryItemModel');
const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');

const galleryController = {
    createGalleryItem: asyncHandler(async (req, res) => {
        if (!req.file) {
            return res.status(400).json({ message: 'File is required' });
        }

        try {
            if (req.user.role !== 'admin') {
                return res.status(403).json({ message: 'Not authorized to create gallery items' });
            }

            const fileFormat = req.file.mimetype.split('/')[0]; // Extract 'image' or 'video'
            const type = fileFormat.charAt(0).toUpperCase() + fileFormat.slice(1); // Capitalize first letter

            if (!['Image', 'Video'].includes(type)) {
                return res.status(400).json({ message: 'Unsupported file type' });
            }

            const galleryItem = await GalleryItem.create({
                type,
                url: req.file.path, // Cloudinary URL
                description: req.body.description,
            });

            res.status(201).json(galleryItem);
        } catch (error) {
            console.error('Create Gallery Item Error:', error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }),

    getGalleryItemById: asyncHandler(async (req, res) => {
        try {
            const galleryItem = await GalleryItem.findById(req.params.id);
            if (!galleryItem) {
                return res.status(404).json({ message: 'Gallery item not found' });
            }
            res.json(galleryItem);
        } catch (error) {
            console.error('Get Gallery Item by ID Error:', error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }),

    getAllGalleryItems: asyncHandler(async (req, res) => {
        try {
            const galleryItems = await GalleryItem.find();
            res.json(galleryItems);
        } catch (error) {
            console.error('Get All Gallery Items Error:', error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }),

    updateGalleryItem: asyncHandler(async (req, res) => {
        try {
            const galleryItem = await GalleryItem.findById(req.params.id);
            if (!galleryItem) {
                return res.status(404).json({ message: 'Gallery item not found' });
            }

            if (req.user.role !== 'admin') {
                return res.status(403).json({ message: 'Not authorized to update gallery items' });
            }

            const updatedGalleryItem = await GalleryItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
            res.json(updatedGalleryItem);
        } catch (error) {
            console.error('Update Gallery Item Error:', error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }),

    deleteGalleryItem: asyncHandler(async (req, res) => {
        try {
            const galleryItem = await GalleryItem.findById(req.params.id);
            if (!galleryItem) {
                return res.status(404).json({ message: 'Gallery item not found' });
            }

            if (req.user.role !== 'admin') {
                return res.status(403).json({ message: 'Not authorized to delete gallery items' });
            }

            await GalleryItem.findByIdAndDelete(req.params.id);
            res.json({ message: 'Gallery item deleted successfully' });
        } catch (error) {
            console.error('Delete Gallery Item Error:', error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }),
};

module.exports = galleryController;