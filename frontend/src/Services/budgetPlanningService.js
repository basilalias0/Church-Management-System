// services/budgetPlanningService.js
const BudgetPlanning = require('../models/budgetPlanningModel');

class BudgetPlanningService {
    static async createBudget(budgetData) {
        try {
            const budget = await BudgetPlanning.create(budgetData);
            return budget;
        } catch (error) {
            throw new Error(`Failed to create budget: ${error.message}`);
        }
    }

    static async getAllBudgets() {
        try {
            const budgets = await BudgetPlanning.find();
            return budgets;
        } catch (error) {
            throw new Error(`Failed to fetch budgets: ${error.message}`);
        }
    }

    static async updateBudget(id, budgetData) {
        try {
            const budget = await BudgetPlanning.findByIdAndUpdate(id, budgetData, { new: true });
            if (!budget) {
                throw new Error('Budget plan not found');
            }
            return budget;
        } catch (error) {
            throw new Error(`Failed to update budget: ${error.message}`);
        }
    }

    static async deleteBudget(id) {
        try {
            const budget = await BudgetPlanning.findByIdAndDelete(id);
            if (!budget) {
                throw new Error('Budget plan not found');
            }
            return budget;
        } catch (error) {
            throw new Error(`Failed to delete budget: ${error.message}`);
        }
    }
}

module.exports = BudgetPlanningService;