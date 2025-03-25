// quizRoutes.js
const express = require('express');
const quizRouter = express.Router();
const quizController = require('../controllers/quizController'); // Adjust the path as needed
const { protect, authorize } = require('../middleware/authMiddleware'); // Adjust the path as needed

quizRouter.post('/', protect, authorize("Admin"), quizController.createQuiz);
quizRouter.get('/latest', protect, quizController.getLatestQuizQuestion);
quizRouter.post('/submit', protect, quizController.submitAnswer);
quizRouter.get('/submission', protect, quizController.getQuizSubmission);

quizRouter.get('/submissions/all', protect, authorize("Admin"), quizController.getAllSubmissions); 
quizRouter.get('/top-scorers', protect, quizController.getTopScorers);
quizRouter.get('/submissions/user/:userId', protect,authorize("Admin"), quizController.getUserSubmissions);

quizRouter.get('/:id', protect, quizController.getQuizById);
quizRouter.put('/:id', protect, authorize("Admin"), quizController.updateQuiz);
quizRouter.delete('/:id', protect, authorize("Admin"), quizController.deleteQuiz);


module.exports = quizRouter;