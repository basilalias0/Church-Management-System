const express = require('express');
const virtualIdCardRouter = express.Router();
const virtualIdCardController = require('../controllers/virtualIdCardController');
const { protect } = require('../middleware/authMiddleware');

virtualIdCardRouter.get('/', protect, virtualIdCardController.getVirtualIdCard);

module.exports = virtualIdCardRouter;