import axios from "axios"
import { BASE_URL } from "../Utiles/Url"

export const loginAPI = async (userToken) => {
      const response = await axios.post(`${BASE_URL}/users/login`, userToken);
      console.log("Login API Response:", response.data); // Debugging
      return response.data;
    
  };
export const registerAPI=async(data)=>{
    
    const response=await axios.post(`${BASE_URL}/users/register`,data)
    return response.data
};