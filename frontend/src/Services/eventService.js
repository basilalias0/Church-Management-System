// src/Services/eventService.js
import axios from 'axios';
import { getuserToken } from '../Utiles/storageHandler';
import { BASE_URL } from '../Utiles/Url';

const API_URL = `${BASE_URL}/event`;

const tokenConfig = () => {
  const token = getuserToken();
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };
};

const createEvent = async (eventData) => {
  const res = await axios.post(API_URL, eventData, tokenConfig());
  return res.data;
};

const getEventById = async (id) => {
  const res = await axios.get(`${API_URL}/${id}`, tokenConfig());
  return res.data;
};

const updateEvent = async (id, eventData) => {
  const res = await axios.put(`${API_URL}/${id}`, eventData, tokenConfig());
  return res.data;
};

const deleteEvent = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`, tokenConfig());
  return res.data;
};

const getAllEvents = async () => {
  const res = await axios.get(API_URL, tokenConfig());
  return res.data;
};

export const eventService = {
  createEvent,
  getEventById,
  updateEvent,
  deleteEvent,
  getAllEvents,
};
