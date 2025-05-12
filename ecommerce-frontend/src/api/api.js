import axios from 'axios';

const API = axios.create({
  baseURL: process.env.BACK_END_API_URL,
});

export default API;
