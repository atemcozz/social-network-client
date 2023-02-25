import axios from "axios";
export const API_URL = process.env.REACT_APP_CLOUDINARY_UPLOAD_URL;
export const CLOUDINARY_UPLOAD_PRESET =
  process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;
export const CLOUDINARY_API_KEY = process.env.REACT_APP_CLOUDINARY_API_KEY;
const api = axios.create({
  baseURL: API_URL,
});
api.interceptors.request.use((config) => {
  return config;
});
console.log(API_URL);
//api.interceptors.response.use((config) => {});
export default api;
