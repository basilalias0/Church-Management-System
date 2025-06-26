const express = require('express');
const virtualIdCardRouter = express.Router();
const virtualIdCardController = require('../controllers/virtualIdCardController');
const { protect } = require('../middleware/authMiddleware'); // Assuming you have auth middleware
const userController = require('../controllers/userController');

// Get Virtual ID Card
virtualIdCardRouter.get('/', protect, virtualIdCardController.getVirtualIdCard);
virtualIdCardRouter.put('/update-profile', protect, userController.updateUserProfile);

module.exports = virtualIdCardRouter;