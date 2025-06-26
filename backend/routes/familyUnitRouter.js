const express = require('express');
const familyUnitRouter = express.Router();
const familyUnitController = require('../controllers/familyUnitController');
const { protect, authorize } = require('../middleware/authMiddleware'); // Assuming you have auth middleware

// Admin routes (protected)
familyUnitRouter.post('/', protect, authorize("Admin","Normal User"), familyUnitController.createFamilyUnit);
familyUnitRouter.get('/:id', protect, authorize("Admin"), familyUnitController.getFamilyUnitById);
familyUnitRouter.put('/:id', protect, authorize("Admin"), familyUnitController.updateFamilyUnit);
familyUnitRouter.delete('/:id', protect, authorize("Admin"), familyUnitController.deleteFamilyUnit);
familyUnitRouter.get('/', protect, familyUnitController.getAllFamilyUnits);
familyUnitRouter.get('/:id/users', familyUnitController.getUsersInFamilyUnit);

module.exports = familyUnitRouter;