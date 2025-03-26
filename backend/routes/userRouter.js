const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/userController');
const { protect, admin, authorize } = require('../middleware/authMiddleware'); // Assuming you have auth middleware
const upload = require('../middleware/uploadMiddleware'); // Assuming you have upload middleware

// User Registration and Login
userRouter.post('/register', userController.registerUser);
userRouter.post('/login', userController.loginUser);

// User Profile Routes
userRouter.get('/profile/:id', protect, userController.getUserById);
userRouter.put('/profile/:id', protect, upload('profile picture').single('photo'), userController.updateUser); // Assuming 'photo' is the field name for file upload

// Admin Routes (Protected)
userRouter.get('/', protect, authorize("Admin"), userController.getAllUsers);
userRouter.delete('/:id', protect, authorize("Admin"), userController.deleteUser);
userRouter.put('/verify/:id', protect, authorize("Admin"), userController.verifyUser);

// Family Member Routes (Protected)
userRouter.post('/family', protect, userController.addFamily);

module.exports = userRouter;