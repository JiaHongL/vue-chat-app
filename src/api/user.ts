import axios from '../axios.ts';

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
