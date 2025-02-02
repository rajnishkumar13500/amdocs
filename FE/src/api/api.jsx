import axios from "axios";
import { getFromLocalStorage } from "../components/auth/auth.service";

const api = axios.create({
  baseURL: "https://test.clouldplaydoctor.online/api/v1",
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
