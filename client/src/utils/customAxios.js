import axios from "axios";
const base_url = import.meta.env.VITE_BASE_URL;

const customAxios = axios.create({
  baseURL: `${base_url}/api/v1`,
  timeout: 5000,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

export default customAxios;
