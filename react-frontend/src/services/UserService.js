import axios from 'axios';
import { headers } from '../utils';

const apiBaseUrl = process.env.REACT_APP_ADMIN_API_BASE_URL;
const apiAdmin = process.env.REACT_APP_ADMIN_API_BASE_URL;

export const getUsers = async () => {
  return await axios.get(`${apiBaseUrl}/users`, {
    headers: headers()
  });
}

export const getUserById = async (userId) => {
  return await axios.get(`${apiBaseUrl}/user/${userId}`, {
    headers: headers()
  });
}

export const registerUser = async (user) => {
  const response = await axios.post(`${apiAdmin}/register`, user, {
    headers: headers()
  });
  return response;
}

export const updateUser = async (user, userId) => {
  return await axios.put(`${apiBaseUrl}/user/${userId}`, user, {
    headers: headers()
  });
}

export const deleteUser = async (userId) => {
  return await axios.delete(`${apiBaseUrl}/user/${userId}`, {
    headers: headers()
  });
}
