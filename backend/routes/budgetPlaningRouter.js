// budgetPlanningRoutes.js
const express = require('express');
const budgetPlanningRouter = express.Router();
const budgetPlanningController = require('../controllers/budgetPlanningController');
const { protect, accountant, authorize } = require('../middleware/authMiddleware');

// Accountant only routes
budgetPlanningRouter.post('/', protect, authorize("Accountant"), budgetPlanningController.createBudget);
budgetPlanningRouter.put('/:id', protect, authorize("Accountant"), budgetPlanningController.updateBudget);
budgetPlanningRouter.delete('/:id', protect, authorize("Accountant"), budgetPlanningController.deleteBudget);

// Public Routes
budgetPlanningRouter.get('/', budgetPlanningController.getAllBudgets);

module.exports = budgetPlanningRouter;