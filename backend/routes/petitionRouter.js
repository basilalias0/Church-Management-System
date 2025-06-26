const express = require('express');
const petitionRouter = express.Router();
const petitionController = require('../controllers/petitionController');
const { protect, authorize } = require('../middleware/authMiddleware'); // Assuming you have auth middleware

// User routes (protected)
petitionRouter.post('/add', protect, petitionController.createPetition);
petitionRouter.get('/my', protect, petitionController.getAllUserPetitions);
petitionRouter.get('/:id', petitionController.getPetitionById); // Public route, no auth needed
petitionRouter.put('/:id', protect, petitionController.updatePetitionByUser);
petitionRouter.delete('/:id', protect, petitionController.deletePetitionByUser);

// Vicar routes (protected)
petitionRouter.put('/:id/status', protect, authorize("Vicar"), petitionController.updatePetitionStatusByVicar);
petitionRouter.get('/', protect, authorize("Vicar","Admin"), petitionController.getAllPetitions); // Vicar can view all petitions

module.exports = petitionRouter;