const express = require('express');
const familyMemberRouter = express.Router();
const familyMemberController = require('../controllers/familyMemberController');
const { protect } = require('../middleware/authMiddleware'); // Assuming you have auth middleware

// User routes (protected)
familyMemberRouter.post('/', protect, familyMemberController.addFamilyMember);
familyMemberRouter.get('/user', protect, familyMemberController.getFamilyMembersByUser);
familyMemberRouter.get('/:id', protect, familyMemberController.getFamilyMemberById);
familyMemberRouter.put('/:id', protect, familyMemberController.updateFamilyMember);
familyMemberRouter.delete('/:id', protect, familyMemberController.deleteFamilyMember);
familyMemberRouter.get('/', protect, familyMemberController.getAllFamilyMembers);


module.exports = familyMemberRouter;