import axios from 'axios';

const API = axios.create({
  baseURL: process.env.BACKEND_APP_API_URL,
});

export default API;
