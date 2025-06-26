// transactionRoutes.js
const express = require('express');
const transactionRouter = express.Router();
const transactionController = require('../controllers/transactionController');
const { protect, accountant, authorize } = require('../middleware/authMiddleware');

// Transaction Routes (Accountant only)
transactionRouter.post('/', protect, authorize("Accountant"), transactionController.createTransaction); // Create a transaction
transactionRouter.get('/', protect, transactionController.getAllTransactions); // View all transactions
transactionRouter.put('/:id', protect, authorize("Accountant"), transactionController.updateTransaction); // update transaction
transactionRouter.delete('/:id', protect, authorize("Accountant"), transactionController.deleteTransaction); // delete transaction

module.exports = transactionRouter;