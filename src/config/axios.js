import axios from "axios";
import { getAccessToken } from "../services/localStorage";

axios.defaults.baseURL = import.meta.env.VITE_END_POINT;

axios.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axios;
