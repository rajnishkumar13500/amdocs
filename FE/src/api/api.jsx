import axios from "axios";

export const apiClient = axios.create({
  baseURL: "",
  timeout: 9000,
});
