import axios from "axios";
import { getuserToken } from "../Utiles/storageHandler";

 const BASE_URL = "https://nexus-bt1n.onrender.com/api/v1/gallery";

const galleryService = {
  async createGalleryItem(file, description) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("description", description);

    const token = getuserToken();
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: token ? `Bearer ${token}` : "",
      },
    };

    const response = await axios.post(BASE_URL, formData, config);
    return response.data;
  },

  async getGalleryItemById(id) {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data;
  },

  async getAllGalleryItems() {
    const response = await axios.get(BASE_URL);
    return response.data;
  },

  async updateGalleryItem(id, updatedData) {
    const token = getuserToken();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
    };

    const response = await axios.put(`${BASE_URL}/${id}`, updatedData, config);
    return response.data;
  },

  async deleteGalleryItem(id) {
    const token = getuserToken();
    const config = {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    };

    const response = await axios.delete(`${BASE_URL}/${id}`, config);
    return response.data;
  },
};

export default galleryService;