import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5018/api/v1", // Sesuaikan dengan endpoint Web API kamu
  headers: { "Content-Type": "application/json" },
});

export default api;
