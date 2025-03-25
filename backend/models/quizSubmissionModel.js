const mongoose = require('mongoose');

const quizSubmissionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    selectedAnswers: [{ 
        quizId: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true },
        answer:{type: String, require:true}
     }],
    score: { type: Number },
});

const QuizSubmission = mongoose.model('QuizSubmission', quizSubmissionSchema);
module.exports = QuizSubmission;