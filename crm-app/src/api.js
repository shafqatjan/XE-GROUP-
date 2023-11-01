import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL; // Define your API URL in .env

const api = axios.create({
  baseURL: API_URL, // Replace with your actual API URL
});

// You can also set headers or authentication tokens here if needed
// api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

export default api;
