const mongoose = require('mongoose');

const budgetPlanningSchema = new mongoose.Schema({
    type: { type: String, enum: ['Income', 'Expense'], required: true },
    description: { type: String, required: true },
    amount: { type: Number, required: true },
    dateOfPlanning: { type: Date, required: true },
});

const BudgetPlanning = mongoose.model('BudgetPlanning', budgetPlanningSchema);

module.exports = BudgetPlanning;