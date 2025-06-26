import axios from "axios";
import { BASE_URL } from "../Utiles/Url";

export const vicarLoginAPI = async (userToken) => {
  try {
    const response = await axios.post(`${BASE_URL}/users/login`, userToken);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Vicar Login API Error:", error.response?.data || error.message);
    throw error;
  }
};
