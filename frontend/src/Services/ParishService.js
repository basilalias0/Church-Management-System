import axios from "axios";

const BASE_URL = "https://nexus-bt1n.onrender.com/api/v1";

export const fetchParishData = async () => {
  try {
    const token = localStorage.getItem("token"); // ✅ Get token from local storage

    if (!token) {
      throw new Error("No token found! Please log in.");
    }

    const response = await axios.get(`${BASE_URL}/parish-member/parish`, {
      headers: {
        Authorization: `Bearer ${token}`, // ✅ Send token in headers
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching parish data:", error.response?.data || error.message);
    throw error;
  }
};
