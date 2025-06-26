import axios from "axios";
import { BASE_URL } from "../Utiles/Url";

export const accountantLoginAPI = async (userToken) => {
  try {
    const response = await axios.post(`${BASE_URL}/users/login`, userToken);
    
    // Ensure the response contains role verification
    if (response.data.role !== "Accountant") {
      throw new Error("Unauthorized: You are not an accountant");
    }

    console.log("Accountant Login Success:", response.data);
    return response.data;
  } catch (error) {
    console.error("Accountant Login API Error:", error.response?.data || error.message);
    throw error;
  }
};
