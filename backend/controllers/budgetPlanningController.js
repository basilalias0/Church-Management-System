const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');
const BudgetPlanning = require('../models/budgetPlanningMOdel');

const budgetPlanningController = {
    createBudget: asyncHandler(async (req, res) => {
        const { type, description, amount, dateOfPlanning } = req.body;

        try {
            const budget = await BudgetPlanning.create({
                type,
                description,
                amount,
                dateOfPlanning,
            });

            res.status(201).json(budget);
        } catch (error) {
            console.error('Create Budget Error:', error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }),

    getAllBudgets: asyncHandler(async (req, res) => {
        try {
            const budgets = await BudgetPlanning.find();
            res.json(budgets);
        } catch (error) {
            console.error('Get All Budgets Error:', error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }),

    updateBudget: asyncHandler(async (req, res) => {
        try {
            const budget = await BudgetPlanning.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!budget) {
                return res.status(404).json({ message: 'Budget plan not found' });
            }
            res.json(budget);
        } catch (error) {
            console.error('Update Budget Error:', error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }),

    deleteBudget: asyncHandler(async (req, res) => {
        try {
            const budget = await BudgetPlanning.findByIdAndDelete(req.params.id);
            if (!budget) {
                return res.status(404).json({ message: 'Budget plan not found' });
            }
            res.json({ message: 'Budget plan deleted successfully' });
        } catch (error) {
            console.error('Delete Budget Error:', error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }),
};

module.exports = budgetPlanningController;