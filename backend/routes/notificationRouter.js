// notificationRoutes.js
const express = require('express');
const notificationRouter = express.Router();
const notificationController = require('../controllers/notificationController'); // Adjust the path
const { protect } = require('../middleware/authMiddleware'); // Adjust the path

notificationRouter.get('/', protect, notificationController.getNotificationsByUser); // Get user notifications

module.exports = notificationRouter;