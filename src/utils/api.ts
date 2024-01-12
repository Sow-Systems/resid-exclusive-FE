import axios, { AxiosInstance } from "axios";

const baseURL = "https://api-residexclusive.onrender.com";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: baseURL,
});

// axiosInstance.interceptors.request.use((config) => {
//   const token = localStorage.getItem("tokenResid");
//   const strSemAspas = token?.replace(/"/g, "");

//   if (token) {
//     config.headers["Authorization"] = `Bearer ${strSemAspas}`;
//   }
//   return config;
// });

export default axiosInstance;

export const api = axiosInstance;
