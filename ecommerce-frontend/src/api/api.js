import axios from 'axios';
import {backEndApiUrl} from '../config';

const API = axios.create({
  baseURL: backEndApiUrl,
});

export default API;
