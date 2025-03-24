// quizRoutes.js
const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController'); // Adjust the path as needed
const { protect, authorize } = require('../middleware/authMiddleware'); // Adjust the path as needed

router.post('/', protect, authorize("Admin"), quizController.createQuiz);
router.get('/:id', protect, quizController.getQuizById);
router.put('/:id', protect, authorize("Admin"), quizController.updateQuiz);
router.delete('/:id', protect, authorize("Admin"), quizController.deleteQuiz);
router.get('/latest', protect, quizController.getLatestQuizQuestion);
router.post('/submit', protect, quizController.submitAnswer);
router.get('/submission', protect, quizController.getQuizSubmission);

module.exports = router;