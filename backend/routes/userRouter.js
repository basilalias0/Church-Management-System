const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { protect, authorize } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/:id', protect, userController.getUserById);
router.put('/:id', protect, upload('profile').single('file'), userController.updateUser);
router.delete('/:id', protect, authorize('Admin'), userController.deleteUser);
router.post('/:id/family', protect, userController.addFamilyMember);
router.put('/:id/verify', protect, authorize('Admin'), userController.verifyUser);
router.get('/', protect, userController.getAllUsers); 
router.post('/admin', protect, authorize('Admin'), userController.addAdmin); 

module.exports = router;