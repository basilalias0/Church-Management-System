const express = require('express');
const parishMemberRouter = express.Router();
const parishMemberController = require('../controllers/parishMemberController');
const { protect, authorize } = require('../middleware/authMiddleware'); // Assuming you have auth middleware

// User routes (protected)
parishMemberRouter.post('/add', protect, parishMemberController.addParishMember);
parishMemberRouter.post('/remove', protect, parishMemberController.removeParishMember);
parishMemberRouter.get('/', protect, parishMemberController.getParishMembers);

parishMemberRouter.post('/toggle', protect, authorize("Admin"), parishMemberController.toggleParishMemberByAdmin);

module.exports = parishMemberRouter;