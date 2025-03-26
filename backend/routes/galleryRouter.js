// galleryRoutes.js
const express = require('express');
const galleryRouter = express.Router();
const galleryController = require('../controllers/galleryController');
const { protect, authorize } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');


galleryRouter.post('/', protect, authorize("Admin"), upload('gallery').single('file'), galleryController.createGalleryItem); // Upload single file to 'gallery' folder
galleryRouter.get('/:id', galleryController.getGalleryItemById);
galleryRouter.get('/', galleryController.getAllGalleryItems);
galleryRouter.put('/:id', protect, authorize("Admin"), galleryController.updateGalleryItem);
galleryRouter.delete('/:id', protect, authorize("Admin"), galleryController.deleteGalleryItem);

module.exports = galleryRouter;