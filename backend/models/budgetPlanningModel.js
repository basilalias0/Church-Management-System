const mongoose = require('mongoose');

const budgetPlanningSchema = new mongoose.Schema({
    type: { type: String, enum: ['income', 'expense'], required: true },
    description: { type: String, required: true },
    amount: { type: Number, required: true },
    dateOfPlanning: { type: Date, required: true },
});

const BudgetPlanning = mongoose.model('BudgetPlanning', budgetPlanningSchema);

module.exports = BudgetPlanning;