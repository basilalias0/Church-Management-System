import axios from "axios";
import { BASE_URL } from "../Utiles/Url";
import { getuserToken } from "../Utiles/storageHandler";

const familyService = {
  // Add a new family member
  addFamilyMember: async (formData) => {
    const token = getuserToken();
    if (!token) {
      throw new Error("Unauthorized: No token found.");
    }

    const response = await axios.post(`${BASE_URL}/family-member`, formData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  },

  // Get all family members
  getAllFamilyMembers: async () => {
    const token = getuserToken();
    if (!token) {
      throw new Error("Unauthorized: No token found. Please log in.");
    }

    try {
      const response = await axios.get(`${BASE_URL}/family-member`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        throw new Error(
          error.response.data.message || "Failed to fetch family members. Server error."
        );
      } else if (error.request) {
        throw new Error("No response from server. Please check your network connection.");
      } else {
        throw new Error(error.message || "An unexpected error occurred.");
      }
    }
  },

  // Delete a family member
  deleteFamilyMember: async (memberId) => {
    const token = getuserToken();
    if (!token) {
      throw new Error("Unauthorized: No token found.");
    }

    const response = await axios.delete(`${BASE_URL}/family-member/${memberId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      // Update a family member
updateFamilyMember: async (memberId, formData) => {
  const token = getuserToken();
  if (!token) {
    throw new Error("Unauthorized: No token found.");
  }

  const response = await axios.put(`${BASE_URL}/family-member/${memberId}`, formData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
},

    });

    return response.data;
  },
};

export { familyService };
