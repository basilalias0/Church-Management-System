const Transaction = require('../models/transactionModel');
const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');

const transactionController = {
    createTransaction: asyncHandler(async (req, res) => {
        const { transactionDate, category, amount, description, type } = req.body;
        if(!transactionDate || !category || !amount || !description || !type) {
            res.status(400).json({ message: 'Please fill in all fields' });
            }

        try {
            const transaction = await Transaction.create({
                transactionDate,
                category,
                amount,
                description,
                type,
            });

            res.status(201).json(transaction);
        } catch (error) {
            console.error('Create Transaction Error:', error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }),

    getAllTransactions: asyncHandler(async (req, res) => {
        try {
            const transactions = await Transaction.find();
            res.json(transactions);
        } catch (error) {
            console.error('Get All Transactions Error:', error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }),

    updateTransaction: asyncHandler(async (req, res) => {
        try {
            const transaction = await Transaction.findById(req.params.id);
    
            if (!transaction) {
                return res.status(404).json({ message: 'Transaction not found' });
            }
    
            if (transaction.category === 'donation') {
                return res.status(403).json({ message: 'Donations cannot be updated' });
            }
    
            const updatedTransaction = await Transaction.findByIdAndUpdate(req.params.id, req.body, { new: true });
            res.json(updatedTransaction);
        } catch (error) {
            console.error('Update Transaction Error:', error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }),
    
    deleteTransaction: asyncHandler(async (req, res) => {
        try {
            const transaction = await Transaction.findById(req.params.id);
    
            if (!transaction) {
                return res.status(404).json({ message: 'Transaction not found' });
            }
    
            if (transaction.category === 'donation') {
                return res.status(403).json({ message: 'Donations cannot be deleted' });
            }
    
            await Transaction.findByIdAndDelete(req.params.id);
            res.json({ message: 'Transaction deleted successfully' });
        } catch (error) {
            console.error('Delete Transaction Error:', error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }),
};

module.exports = transactionController;