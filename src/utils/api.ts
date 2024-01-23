import axios, { AxiosInstance } from "axios";
import Cookies from "js-cookie";

const baseURL = "https://api-residexclusive.onrender.com";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: baseURL,
});

axiosInstance.interceptors.request.use((config) => {
  const token = Cookies.get("tokenResid");

  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;

export const api = axiosInstance;
