const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');
const { protect, authorize } = require('../middleware/authMiddleware'); // Assuming you have auth middleware

// Admin routes (protected)
router.post('/', protect, authorize("Admin"), quizController.createQuiz);
router.get('/submissions/all', protect, authorize("Admin"), quizController.getAllSubmissions); // Get all submissions (admin only)
router.get('/submissions/user/:userId', protect, authorize("Admin"), quizController.getUserSubmissions); // Get user submissions by userId (admin only)

// User routes (protected)
router.get('/latest', protect, quizController.getLatestQuizQuestions);
router.post('/submit', protect, quizController.submitAnswer);
router.get('/submissions', protect, quizController.getQuizSubmission); // Get user's submissions
router.get('/top-scorers', protect, quizController.getTopScorers); // Get top scorers

router.get('/:id', quizController.getQuizById); // No auth for public quiz viewing
router.put('/:id', protect, authorize("Admin"), quizController.updateQuiz);
router.delete('/:id', protect, authorize("Admin"), quizController.deleteQuiz);

module.exports = router;