import axios from 'axios';
import { BASE_URL } from '../Utiles/Url';
import { getuserToken } from '../Utiles/storageHandler';


const getConfig = () => {
    const token = getuserToken()
    return { headers: { Authorization: `Bearer ${token}` } };
};

export const createPetitionAPI = async (petitionData) => {
    const response = await axios.post(`${BASE_URL}/petition/add`, petitionData, getConfig());
    return response.data;
};

export const getUserPetitionsAPI = async () => {
    const response = await axios.get(`${BASE_URL}/petition/my`, getConfig());
    return response.data;
};

export const getPetitionByIdAPI = async (id) => {
    const response = await axios.get(`${BASE_URL}/petition/${id}`, getConfig());
    return response.data;
};

export const updatePetitionAPI = async (id, petitionData) => {
    const response = await axios.put(`${BASE_URL}/petition/${id}`, petitionData, getConfig());
    return response.data;
};

export const deletePetitionAPI = async (id) => {
    const response = await axios.delete(`${BASE_URL}/petition/${id}`, getConfig());
    return response.data;
};

export const updatePetitionStatusAPI = async (id, status) => {
    const response = await axios.put(`${BASE_URL}/petition/${id}/status`, { status }, getConfig());
    return response.data;
};

export const getAllPetitionsAPI = async () => {
    const response = await axios.get(`${BASE_URL}/petition`, getConfig());
    return response.data;
};
