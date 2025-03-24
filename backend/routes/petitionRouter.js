// petitionRoutes.js
const express = require('express');
const router = express.Router();
const petitionController = require('../controllers/petitionController');
const { protect, vicar } = require('../middleware/authMiddleware');

router.post('/', protect, petitionController.createPetition);
router.get('/:id', protect, petitionController.getPetitionById);
router.put('/:id', protect, petitionController.updatePetitionByUser);
router.delete('/:id', protect, petitionController.deletePetitionByUser);
router.put('/:id/status', protect, vicar, petitionController.updatePetitionStatusByVicar);
router.get('/', protect, petitionController.getAllPetitions);

module.exports = router;