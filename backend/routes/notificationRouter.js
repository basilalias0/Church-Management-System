// notificationRoutes.js
const express = require('express');
const notificationRouter = express.Router();
const notificationController = require('../controllers/notificationController'); // Adjust the path
const { protect } = require('../middleware/authMiddleware'); // Adjust the path

notificationRouter.get('/', protect, notificationController.getNotificationsByUser); // Get user notifications
notificationRouter.delete('/mark-as-read/:id', protect, notificationController.markAsRead);
notificationRouter.delete('/mark-all-as-read', protect, notificationController.markAllAsRead); 

module.exports = notificationRouter;