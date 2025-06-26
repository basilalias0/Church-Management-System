import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';

const QuizResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { score, total } = location.state || { score: 0, total: 0 };

  useEffect(() => {
    confetti({
      particleCount: 200,
      spread: 160,
      origin: { y: 0.6 },
    });
  }, []);

  return (
    <div className="h-screen flex items-center justify-center bg-blue-50">
      <div className="p-8 max-w-2xl mx-auto bg-white border-2 border-gray-300 text-gray-900 shadow-lg rounded-xl text-center">
        <h2 className="text-3xl font-extrabold mb-6 text-blue-700">Quiz Completed!</h2>
        <p className="text-2xl font-bold mb-4">
          Your Score: {score} / {total}
        </p>
        <button
          onClick={() => navigate('/user-home')}
          className="bg-green-500 text-white py-3 px-6 rounded-lg text-lg font-bold hover:bg-green-600 transition duration-300"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default QuizResult;
