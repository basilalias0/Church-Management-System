import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getLatestQuizzesAPI } from "../Services/QuizService";

const QuizForm = () => {
  const navigate = useNavigate();
  const { data: quizData, isLoading } = useQuery({
    queryFn: getLatestQuizzesAPI,
    queryKey: ['view-quiz']
  });

  console.log(quizData);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showCorrect, setShowCorrect] = useState(false);
  const [score, setScore] = useState(0);

  if (isLoading) return <div className="text-center py-8">Loading quiz...</div>;

  const questions = quizData || [];

  const handleOptionClick = (option) => {
    setSelectedAnswer(option);
    if (option === questions[currentQuestion].correctAnswer) {
      setScore((prevScore) => prevScore + 1);
    } else {
      setShowCorrect(true);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowCorrect(false);
    }
  };

  const handleFinish = () => {
    navigate("/quiz-result", { state: { score, total: questions.length } });
  };

  return (
    <div className="p-8 max-w-2xl mx-auto bg-white border-2 border-gray-300 text-gray-900 shadow-lg rounded-xl">
      <h2 className="text-3xl font-extrabold mb-6 text-center text-blue-700">Jesus Quiz for Kids</h2>
      <div className="p-6 bg-gray-100 rounded-lg shadow-md">
        <p className="font-semibold text-xl">{questions[currentQuestion]?.question}</p>
        {questions[currentQuestion]?.options.map((option, i) => (
          <button
            key={i}
            onClick={() => handleOptionClick(option)}
            className={`block mt-4 p-3 w-full text-left rounded-lg text-lg font-medium transition duration-300 
              ${selectedAnswer === option ? (option === questions[currentQuestion].correctAnswer ? "bg-green-500 text-white" : "bg-red-500 text-white") : "bg-gray-200 hover:bg-gray-300"}`}
            disabled={selectedAnswer !== null}
          >
            {option}
          </button>
        ))}
        {showCorrect && (
          <p className="mt-4 text-red-600 font-bold">Correct Answer: {questions[currentQuestion].correctAnswer}</p>
        )}
      </div>
      {currentQuestion < questions.length - 1 ? (
        <button
          onClick={handleNext}
          disabled={selectedAnswer === null}
          className="w-full mt-6 bg-blue-500 text-white py-3 px-6 rounded-lg text-lg font-bold hover:bg-blue-600 transition duration-300"
        >
          Next
        </button>
      ) : (
        <button
          onClick={handleFinish}
          className="w-full mt-6 bg-green-500 text-white py-3 px-6 rounded-lg text-lg font-bold hover:bg-green-600 transition duration-300"
        >
          Finish
        </button>
      )}
      <div className="mt-6 text-center font-bold text-2xl text-green-700">
        Total Marks: {score} / {questions.length}
      </div>
    </div>
  );
};

export default QuizForm;