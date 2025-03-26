const express = require('express');
const bloodDonorRouter = express.Router();
const bloodDonorController = require('../controllers/bloodDonorController');
const { protect } = require('../middleware/authMiddleware'); // Assuming you have auth middleware

// User routes (protected)
bloodDonorRouter.post('/', protect, bloodDonorController.createBloodDonor);
bloodDonorRouter.put('/', protect, bloodDonorController.updateBloodDonor);
bloodDonorRouter.delete('/', protect, bloodDonorController.deleteBloodDonor);
bloodDonorRouter.post('/toggle', protect, bloodDonorController.toggleBloodDonor);
bloodDonorRouter.get('/', protect, bloodDonorController.getBloodDonors);

module.exports = bloodDonorRouter;