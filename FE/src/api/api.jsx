import axios from "axios";
import { getFromLocalStorage } from "../components/auth/auth.service";

const BASE_API_URL = import.meta.env.VITE_APP_BASE_API_URL;
if (!BASE_API_URL) {
  console.error("Base API URL is not defined in environment variables");
}

const api = axios.create({
  baseURL: BASE_API_URL || "https://test.clouldplaydoctor.online/api/",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Add a request interceptor to include the token in headers
api.interceptors.request.use(
  (config) => {
    const token = getFromLocalStorage("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const apiClient = api;
