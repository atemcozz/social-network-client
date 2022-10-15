import axios from "axios";
//export const API_URL = "http://localhost:4000/api";
export const API_URL = process.env.REACT_APP_API_URL;
const api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});
api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem(
    "access_token"
  )}`;
  return config;
});
//api.interceptors.response.use((config) => {});
export default api;
