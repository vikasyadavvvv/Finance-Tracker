import axios from "axios";

const API = axios.create({
  baseURL: "https://finance-tracker-delta-beige.vercel.app/api",
});

// Attach token to requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Auth endpoints
export const registerUser = (data) => API.post("/auth/register", data);
export const loginUser = (data) => API.post("/auth/login", data);

// Transaction endpoints
export const getTransactions = () => API.get("/transactions");
export const addTransaction = (data) => API.post("/transactions", data);
export const updateTransaction = (id, data) => API.put(`/transactions/${id}`, data);
export const deleteTransaction = (id) => API.delete(`/transactions/${id}`);

