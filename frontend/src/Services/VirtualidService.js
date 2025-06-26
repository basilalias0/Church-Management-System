import axios from "axios";
import { BASE_URL } from "../Utiles/Url";

export const getVirtualId= async (token) => {
  try {
    const response = await axios.get(`${BASE_URL}/id-card`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Virtual ID Fetch Error:", error.response?.data || error.message);
    throw error;
  }
};
