import axios from 'axios';
import { BASE_URL } from '../Utiles/Url'; // Update with your correct URL
import { getuserToken } from '../Utiles/storageHandler';

// Helper function to get the configuration with token
const getConfig = () => {
    const token = getuserToken();  // Retrieve user data (usually token) from storage
    return { headers: { Authorization: `Bearer ${token}` } };
};

// Create a new quiz
export const createQuizAPI = async (quizData) => {
    const response = await axios.post(`${BASE_URL}/quiz//quiz-forms`, quizData, getConfig());
    return response.data;
};

// Get a quiz by ID
export const getQuizByIdAPI = async (id) => {
    const response = await axios.get(`${BASE_URL}/quiz/${id}`, getConfig());
    return response.data;
};

// Get the latest quizzes for a user
export const getLatestQuizzesAPI = async () => {
    const response = await axios.get(`${BASE_URL}/quiz/latest`, getConfig());
    return response.data;
};

// Submit answers to a quiz
export const submitQuizAnswerAPI = async (quizId, selectedAnswer) => {
    const response = await axios.post(`${BASE_URL}/quiz/submit`, { quizId, selectedAnswer }, getConfig());
    return response.data;
};

// Update quiz details
export const updateQuizAPI = async (id, quizData) => {
    const response = await axios.put(`${BASE_URL}/quiz/${id}`, quizData, getConfig());
    return response.data;
};

// Delete a quiz
export const deleteQuizAPI = async (id) => {
    const response = await axios.delete(`${BASE_URL}/quiz/${id}`, getConfig());
    return response.data;
};

// Get all quiz submissions for the user
export const getUserQuizSubmissionsAPI = async () => {
    const response = await axios.get(`${BASE_URL}/quiz/submissions`, getConfig());
    return response.data;
};

// Get the top scorers
export const getTopScorersAPI = async () => {
    const response = await axios.get(`${BASE_URL}/quiz/top-scorers`, getConfig());
    return response.data;
};
