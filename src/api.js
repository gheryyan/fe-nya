import axios from "axios";

const api = axios.create({
  baseURL: "http://www.web-gws.my.id/api",
});

// inject token sebelum request dikirim
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // simpan token di localStorage setelah login
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
