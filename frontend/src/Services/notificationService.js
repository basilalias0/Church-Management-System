// src/Services/notificationService.js
import axios from 'axios';
import { BASE_URL } from '../Utiles/Url';
import { getuserToken } from '../Utiles/storageHandler';

// export const notificationService = {
  

//   markAsRead: async (notificationId) => {
//     const res = await axios.put(`${BASE_URL}/read/${notificationId}`, {}, getAuthConfig());
//     return res.data;
//   },

//   markAllAsRead: async () => {
//     const res = await axios.put(`${BASE_URL}/read-all`, {}, getAuthConfig());
//     return res.data;
//   },
// };

export const getUserNotificationsAPI =  async () => {
  
  const res = await axios.get(`${BASE_URL}/notification`, {
    headers:{
      Authorization: `Bearer ${getuserToken()}`
    }
  });
  return res.data;
}

export const markAsReadAPI =  async (id) => {
  
  const res = await axios.delete(`${BASE_URL}/notification/mark-as-read/${id}`,{
    headers:{
      Authorization: `Bearer ${getuserToken()}`
    }
  });
  return res.data;
}

export const MarkAllAsReadAPI =  async () => {
  const res = await axios.delete(`${BASE_URL}/notification/mark-all-as-read`,{
    headers:{
      Authorization: `Bearer ${getuserToken()}`
    }
  });
  return res.data;
}