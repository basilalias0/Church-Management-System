import axios from "axios";
import { BASE_URL } from "../Utiles/Url";
import { getuserToken } from "../Utiles/storageHandler";

/**
 * Get authentication headers with Bearer Token
 */
const getConfig = () => {
  const token = getuserToken();
  if (!token) {
    console.warn("🚨 No token found! Redirecting to login...");
    window.location.href = "/login";
    throw new Error("No authentication token available"); // Prevent further execution
  }
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
};

/**
 * Create a Transaction
 */
export const createTransactionAPI = async (transactionData) => {
  const payload = {
    transactionDate: transactionData.transactionDate || new Date().toISOString().split("T")[0], // Default to today
    category: transactionData.category || "",
    amount: Number(transactionData.amount) || 0, // Ensure number type
    description: transactionData.description || "No description provided", // Default for required field
    type: transactionData.type || "expense", // Default to "expense" as this is an expense management app
  };

  console.log("📤 Sending Data:", payload);

  try {
    const response = await axios.post(`${BASE_URL}/transaction`, payload, getConfig());
    console.log("✅ Transaction Created:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ API Error:", error.response?.data || error.message);
    const errorMessage = error.response?.data?.message || "Failed to create transaction";
    throw new Error(errorMessage);
  }
};

/**
 * Get All Transactions
 */
export const getTransactionsAPI = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/transaction`, getConfig());
    console.log("✅ Transactions Fetched:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ API Error:", error.response?.data || error.message);
    const errorMessage = error.response?.data?.message || "Failed to fetch transactions";
    throw new Error(errorMessage);
  }
};

/**
 * Delete a Transaction
 */
export const deleteTransactionAPI = async (id) => {
  if (!id) {
    throw new Error("Transaction ID is required");
  }
  try {
    const response = await axios.delete(`${BASE_URL}/transaction/${id}`, getConfig());
    console.log("✅ Transaction Deleted:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ API Error:", error.response?.data || error.message);
    const errorMessage = error.response?.data?.message || "Failed to delete transaction";
    throw new Error(errorMessage);
  }
};