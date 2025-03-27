const express = require('express');
const balanceSheetRouter = express.Router();
const balanceSheetController = require('../controllers/balanceSheetController');
const { protect, authorize } = require('../middleware/authMiddleware'); // Assuming you have auth middleware

// Accountant only routes
balanceSheetRouter.get('/', protect, balanceSheetController.getBalanceSheet);

module.exports = balanceSheetRouter;