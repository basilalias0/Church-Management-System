const express = require('express');
const virtualIdCardRouter = express.Router();
const virtualIdCardController = require('../controllers/virtualIdCardController');
const { protect } = require('../middleware/authMiddleware'); // Assuming you have auth middleware

// Get Virtual ID Card
virtualIdCardRouter.get('/', protect, virtualIdCardController.getVirtualIdCard);

module.exports = virtualIdCardRouter;