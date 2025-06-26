// quizController.js
const Quiz = require('../models/quizModel');
const QuizSubmission = require('../models/quizSubmissionModel');
const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');

const quizController = {
    createQuiz: asyncHandler(async (req, res) => {
        const { question, options, correctAnswer } = req.body;

        if (!question || !options || !correctAnswer) {
            return res.status(400).json({ message: 'Question, options, and correctAnswer are required' });
        }
        if (!options.includes(correctAnswer)) {
            return res.status(400).json({ message: 'Correct answer must be one of the provided options' });
        }
        try {
            const quiz = await Quiz.create({ question, options, correctAnswer });
            res.status(201).json(quiz);
        } catch (error) {
            console.error('Create Quiz Error:', error);
            if (error instanceof mongoose.Error.ValidationError) {
                return res.status(400).json({ message: 'Validation error', errors: error.errors });
            }
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }),

    getQuizById: asyncHandler(async (req, res) => {
        try {
            const quiz = await Quiz.findById(req.params.id);
            if (!quiz) {
                return res.status(404).json({ message: 'Quiz not found' });
            }
            res.json(quiz);
        } catch (error) {
            console.error('Get Quiz by ID Error:', error);
            if (error instanceof mongoose.Error.CastError) {
                return res.status(400).json({ message: 'Invalid quiz ID' });
            }
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }),

    updateQuiz: asyncHandler(async (req, res) => {
        const { question, options, correctAnswer } = req.body;

        try {
            const quiz = await Quiz.findById(req.params.id);
            if (!quiz) {
                return res.status(404).json({ message: 'Quiz not found' });
            }

            quiz.question = question || quiz.question;
            quiz.options = options || quiz.options;
            quiz.correctAnswer = correctAnswer || quiz.correctAnswer;

            await quiz.save();

            // Invalidate user submissions if correctAnswer is changed.
            if (correctAnswer && correctAnswer !== quiz.correctAnswer) {
                await QuizSubmission.updateMany({ "selectedAnswers.quizId": req.params.id }, { "selectedAnswers.$.answer": null });
            }

            res.json(quiz);
        } catch (error) {
            console.error('Update Quiz Error:', error);
            if (error instanceof mongoose.Error.ValidationError) {
                return res.status(400).json({ message: 'Validation error', errors: error.errors });
            } else if (error instanceof mongoose.Error.CastError) {
                return res.status(400).json({ message: 'Invalid quiz ID' });
            }
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }),

    deleteQuiz: asyncHandler(async (req, res) => {
        try {
            const quiz = await Quiz.findByIdAndDelete(req.params.id);
            if (!quiz) {
                return res.status(404).json({ message: 'Quiz not found' });
            }

            await QuizSubmission.updateMany({ "selectedAnswers.quizId": req.params.id }, { $pull: { selectedAnswers: { quizId: req.params.id } } });

            res.json({ message: 'Quiz and associated submissions deleted successfully' });
        } catch (error) {
            console.error('Delete Quiz Error:', error);
            if (error instanceof mongoose.Error.CastError) {
                return res.status(400).json({ message: 'Invalid quiz ID' });
            }
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }),

    getLatestQuizQuestions: asyncHandler(async (req, res) => {
        try {
            
            const userId = req.user.id;
    
            const submission = await QuizSubmission.findOne({ userId: userId }).sort({ date: -1 });
    
            if (submission) {
                if (submission.selectedAnswers.length > 0) {
                    // User has answered some questions
                    const answeredQuizIds = submission.selectedAnswers.map(ans => ans.quizId);
    
                    const unansweredQuizzes = await Quiz.find({ _id: { $nin: answeredQuizIds } })
                        .sort({ date: -1 })
                        .limit(10);
    
                    if (unansweredQuizzes.length > 0) {
                        return res.json(unansweredQuizzes);
                    } else {
                        return res.json({ message: "All questions have been answered." });
                    }
                } else {
                    // User has a submission, but no answered questions
                    const latestQuizzes = await Quiz.find().sort({ date: -1 }).limit(10);
    
                    if (latestQuizzes.length > 0) {
                        return res.json(latestQuizzes);
                    } else {
                        return res.json({ message: "No questions found" });
                    }
                }
            } else {
                // User has no submissions
                const latestQuizzes = await Quiz.find().sort({ date: -1 }).limit(10);
    
                if (latestQuizzes.length > 0) {
                    return res.json(latestQuizzes);
                } else {
                    return res.json({ message: "No questions found" });
                }
            }
        } catch (error) {
            console.error("Get Latest Quiz Questions Error:", error);
            res.status(500).json({ message: "Internal server error", error: error.message });
        }
    }),

    submitAnswer: asyncHandler(async (req, res) => {
        const { quizId, selectedAnswer } = req.body;

        if (!quizId || !selectedAnswer) {
            return res.status(400).json({ message: 'quizId and selectedAnswer are required' });
        }

        try {
            const quiz = await Quiz.findById(quizId);
            if (!quiz) {
                return res.status(404).json({ message: 'Quiz not found' });
            }

            let submission = await QuizSubmission.findOne({ userId: req.user.id });

            if (!submission) {
                submission = await QuizSubmission.create({
                    userId: req.user.id,
                    selectedAnswers: [{ quizId, answer: selectedAnswer }],
                });
            } else {
                const alreadyAnswered = submission.selectedAnswers.some(ans => ans.quizId.toString() === quizId.toString());

                if (alreadyAnswered) {
                    return res.status(400).json({ message: 'Question already answered.' });
                }

                submission.selectedAnswers.push({ quizId, answer: selectedAnswer });
                await submission.save();
            }

            res.status(201).json(submission);
        } catch (error) {
            console.error('Submit Answer Error:', error);
            if (error instanceof mongoose.Error.ValidationError) {
                return res.status(400).json({ message: 'Validation error', errors: error.errors });
            } else if (error instanceof mongoose.Error.CastError) {
                return res.status(400).json({ message: 'Invalid quiz ID' });
            }
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }),

    getQuizSubmission: asyncHandler(async (req, res) => {
        try {
            const submission = await QuizSubmission.findOne({ userId: req.user.id }).populate('selectedAnswers.quizId');
            if (!submission) {
                return res.status(404).json({ message: 'Quiz submission not found' });
            }
            res.json(submission);
        } catch (error) {
            console.error('Get Quiz Submission Error:', error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }),

    getAllSubmissions: asyncHandler(async (req, res) => {
        try {
            const submissions = await QuizSubmission.find().populate('userId', 'name email').populate('selectedAnswers.quizId'); // change username to name.
            res.json(submissions);
        } catch (error) {
            console.error('Get All Submissions Error:', error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }),

    getTopScorers: asyncHandler(async (req, res) => {
        try {

            const submissions = await QuizSubmission.find().populate('userId', 'name email').populate('selectedAnswers.quizId'); // change username to name.

            const scores = submissions.map(submission => {
                let score = 0;
                submission.selectedAnswers.forEach(answer => {
                    if (answer.quizId.correctAnswer === answer.answer) {
                        score++;
                    }
                });
                return { userId: submission.userId, score };
            });

            scores.sort((a, b) => b.score - a.score);

            res.json(scores);
        } catch (error) {
            console.error('Get Top Scorers Error:', error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }),

    getUserSubmissions: asyncHandler(async (req, res) => {
        try {
            const userId = req.params.userId;
            const submissions = await QuizSubmission.find({ userId: userId }).populate('userId', 'name email').populate('selectedAnswers.quizId'); // change username to name.
            if (!submissions) {
                return res.status(404).json({ message: "User submissions not found." });
            }
            res.json(submissions);
        } catch (error) {
            console.error('Get User Submissions Error:', error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }),
};

module.exports = quizController;