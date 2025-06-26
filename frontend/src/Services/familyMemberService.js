import axios from "axios";
import { getuserToken } from "../Utiles/storageHandler";
import { BASE_URL } from "../Utiles/Url";

// Function to get authorization headers
const getAuthHeaders = () => {
    const token = getuserToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
};

const familyMemberService = {
    // Add a new family member
    addFamilyMember: async (familyMemberData) => {
        try {
            const response = await axios.post(`${BASE_URL}/family-member`, familyMemberData, {
                headers: getAuthHeaders(),
            });
            return response.data;
        } catch (error) {
            throw error.response?.data?.message || "Failed to add family member";
        }
    },

    // Get all family members
    getAllFamilyMembers: async () => {
        try {
            const response = await axios.get(`${BASE_URL}/family-member/user`, {
                headers: getAuthHeaders(),
            });
            return response.data;
        } catch (error) {
            throw error.response?.data?.message || "Failed to fetch family members";
        }
    },

    // Get a single family member by ID
    getFamilyMemberById: async (id) => {
        try {
            const response = await axios.get(`${BASE_URL}/family-member/${id}`, {
                headers: getAuthHeaders(),
            });
            return response.data;
        } catch (error) {
            throw error.response?.data?.message || "Failed to fetch family member";
        }
    },

    // Update a family member
    updateFamilyMember: async (id, updatedData) => {
        try {
            const response = await axios.put(`${BASE_URL}/family-member/${id}`, updatedData, {
                headers: getAuthHeaders(),
            });
            return response.data;
        } catch (error) {
            throw error.response?.data?.message || "Failed to update family member";
        }
    },

    // Delete a family member
    deleteFamilyMember: async (id) => {
        try {
            const response = await axios.delete(`${BASE_URL}/family-member/${id}`, {
                headers: getAuthHeaders(),
            });
            return response.data;
        } catch (error) {
            throw error.response?.data?.message || "Failed to delete family member";
        }
    },
};

export default familyMemberService;
