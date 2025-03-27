const express = require('express');
const receiptRouter = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');
const receiptController = require('../controllers/receiptController');



receiptRouter.get('/', protect, receiptController.getAllReceipts)
receiptRouter.get('/:id',protect, receiptController.getReceiptByTransactionId)

module.exports = receiptRouter