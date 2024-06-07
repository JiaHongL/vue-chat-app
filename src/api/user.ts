import axios from './axios.js';

const apiUrl = import.meta.env.VITE_API_BASE_URL;
const prefixUrl = apiUrl + '/users';

export const login = (params:{
  username:string;
  password:string;
}) => {
  return axios.post(`${prefixUrl}/login`, params);
};

export const register = (params:{
  username:string;
  password:string;
}) => {
  return axios.post(`${prefixUrl}/register`, params);
}

export const getUserInfo = () => {
  return axios.get(`${prefixUrl}/me`);
}

export const getUsers = () => {
  return axios.get(prefixUrl);
}