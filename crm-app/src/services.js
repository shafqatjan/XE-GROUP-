// services.js

import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL; // Define your API URL in .env

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000, // Adjust the timeout as needed
});

// Function to get the JWT token from local storage
const getToken = () => {
  return localStorage.getItem("token");
};

// Function to add the JWT token to the headers
const setAuthHeader = (config) => {
  const token = getToken();
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
};

// Request interceptor to add the Authorization header
api.interceptors.request.use(
  (config) => {
    return setAuthHeader(config);
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Function to perform a login API call
export const login = (email, password) => {
  return api.post(`/login`, { email, password });
};
// Function to fetch the list of employees
export const fetchEmployeeList = () => {
  return api.get(`${API_URL}/employees`);
};

// Function to edit an employee
export const editEmployee = (employee) => {
  return api.put(`${API_URL}/employees/${employee.id}`, employee);
};

// Function to delete an employee
export const deleteEmployee = (employeeId) => {
  return api.delete(`${API_URL}/employees/${employeeId}`);
};

// Function to add a new employee
export const addEmployee = (employee) => {
  return api.post(`${API_URL}/employees`, employee);
};
export async function fetchCompanyList() {
  try {
    const response = await api.get("/companies");
    return response.data;
  } catch (error) {
    throw error;
  }
}
export default api;
