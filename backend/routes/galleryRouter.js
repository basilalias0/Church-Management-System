// galleryRoutes.js
const express = require('express');
const galleryRouter = express.Router();
const galleryController = require('../controllers/galleryController');
const { protect, admin } = require('../middleware/authMiddleware');
const upload = require('../utils/cloudinaryUpload'); // Import your cloudinary upload middleware

galleryRouter.post('/', protect, admin, upload('gallery').single('file'), galleryController.createGalleryItem); // Upload single file to 'gallery' folder
galleryRouter.get('/:id', galleryController.getGalleryItemById);
galleryRouter.get('/', galleryController.getAllGalleryItems);
galleryRouter.put('/:id', protect, admin, galleryController.updateGalleryItem);
galleryRouter.delete('/:id', protect, admin, galleryController.deleteGalleryItem);

module.exports = galleryRouter;