import axios from "axios";
import store from "../../store";

export const API_URL = process.env.REACT_APP_API_URL;

const api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});
api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem(
    "access_token",
  )}`;
  return config;
});
api.interceptors.response.use(response => {
  return response;
}, error => {
  if (error.response.status === 401 && store.auth) {
    store.verifyAuth().then((token) => {
      error.config.headers.Authorization = `Bearer ${token}`;
      console.log(token);
      return axios.request(error.config);
    });
  }
  if (error?.response?.data?.message === "ERR_USER_BANNED") {
    store.logout();
  }

  throw error;
});
export default api;
