const express = require('express');
const bloodDonorRouter = express.Router();
const bloodDonorController = require('../controllers/bloodDonorController');
const { protect, authorize } = require('../middleware/authMiddleware');

bloodDonorRouter.put('/true', protect, bloodDonorController.createBloodDonor); 
bloodDonorRouter.get('/', protect, bloodDonorController.getAllBloodDonors);
bloodDonorRouter.put('/false', protect, bloodDonorController.markBloodDonorAsFalse); 
bloodDonorRouter.put('/', protect, bloodDonorController.updateBloodDonorDetails);
bloodDonorRouter.get('/search', protect, bloodDonorController.searchBloodDonors);
bloodDonorRouter.get('/:id', protect, bloodDonorController.getBloodDonorById);

module.exports = bloodDonorRouter;