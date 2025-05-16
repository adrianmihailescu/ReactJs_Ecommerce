import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_BACK_END_API_URL,
});

export default API;
