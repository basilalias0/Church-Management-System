const express = require('express');
const parishMemberRouter = express.Router();
const parishMemberController = require('../controllers/parishMemberController');
const { protect, authorize } = require('../middleware/authMiddleware');

parishMemberRouter.post('/', protect, parishMemberController.createParishMember);
parishMemberRouter.get('/', protect, parishMemberController.getAllParishMembers);
parishMemberRouter.get('/search', protect, parishMemberController.searchParishMembers);
parishMemberRouter.get('/:id', protect, parishMemberController.getParishMemberById);
parishMemberRouter.put('/:id', protect, authorize('Admin'), parishMemberController.updateParishMember);
parishMemberRouter.delete('/:id', protect, authorize('Admin'), parishMemberController.deleteParishMember);



module.exports = parishMemberRouter;