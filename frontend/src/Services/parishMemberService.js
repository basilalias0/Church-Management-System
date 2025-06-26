import axios from "axios";
import { BASE_URL } from "../Utiles/Url";
import { getuserToken } from "../Utiles/storageHandler";

const familyMemberService = {
  addFamilyMember: async (formData) => {
    const token = getuserToken();
    if (!token) {
      throw new Error("Unauthorized: No token found.");
    }

    const response = await axios.post(`${BASE_URL}/family-member/`, formData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },
};

export { familyMemberService };