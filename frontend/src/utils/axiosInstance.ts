
import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://travel-agency-booking-system-sl3v.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  const authHeader = localStorage.getItem("authHeader");

  if (authHeader && config.url && config.url.startsWith('/admin')) {
    config.headers.Authorization = authHeader;  
  }

  return config;
});

//export default axiosInstance;
