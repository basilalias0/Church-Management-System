import axios from "axios";
import { BASE_URL } from "../Utiles/Url";
import { getuserToken } from "../Utiles/storageHandler";

/**
 * Get authentication headers with Bearer Token
 */
const getAuthHeaders = () => {
    const token = localStorage.getItem("userToken"); // ✅ Directly get token
    if (!token) {
        console.warn("No token found! Redirecting to login...");
        window.location.href = "/login"; // Redirect user to login
        return { headers: {} }; // Prevent API crashes
    }
    return {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    };
};

/**
 * Create a Blood Donor
 * @param {Object} donorData - { bloodType, contactNumber }
 */
export const createBloodDonorAPI = async (donorData) => {
    try {
        const response = await axios.post(`${BASE_URL}/blood-donor`, donorData, getAuthHeaders());
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
};

/**
 * Update Blood Donor Details
 * @param {Object} donorData - { bloodType, contactNumber }
 */
export const updateBloodDonorAPI = async (donorData) => {
    try {
        const response = await axios.put(`${BASE_URL}/blood-donor`, donorData, getAuthHeaders());
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
};

/**
 * Delete Blood Donor
 */
export const deleteBloodDonorAPI = async () => {
    try {
        const response = await axios.delete(`${BASE_URL}/blood-donor`, getAuthHeaders());
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
};

/**
 * Toggle Blood Donor Status
 */
export const toggleBloodDonorAPI = async () => {
    try {
        const response = await axios.post(`${BASE_URL}/blood-donor/toggle`, {}, getAuthHeaders());
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
};

/**
 * Get Blood Donors List
 * @param {Object} filters - { bloodType, name }
 */
export const getBloodDonorsAPI = async (filters = {}) => {
        const token = getuserToken()
        const response = await axios.get(`${BASE_URL}/blood-donor?${filters}`, {
            headers:{
                Authorization:`Bearer ${token}`
            }
        });
        return response.data;
    
};

/**
 * Handle API Errors
 * @param {Object} error - Error Object
 */
const handleApiError = (error) => {
    console.error("API Error:", error.response?.data || error.message);
    throw error;
};
