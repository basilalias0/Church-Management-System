import axios from "axios";
import { BASE_URL } from "../Utiles/Url";

// API Service
const userService = {
  getUnverifiedUsers: async () => {
    const response = await axios.get(`${BASE_URL}/users/unverified`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
      },
    });
    return response.data;
  },
  verifyUser: async (userId) => {
    const response = await axios.put(
      `${BASE_URL}/users/verify/${userId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
        },
      }
    );
    return response.data;
  },
  unverifyUser: async (userId) => {
    const response = await axios.put(
      `${BASE_URL}/users/unverify/${userId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
        },
      }
    );
    return response.data;
  },
  getAllUsers: async () => {
    const response = await axios.get(`${BASE_URL}/users`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
      },
    });
    return response.data;
  },
  
};
export default userService