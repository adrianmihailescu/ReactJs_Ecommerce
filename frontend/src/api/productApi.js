// src/api/productApi.js
import API from './api';

export const getProducts = async () => {
  const { data } = await API.get('/api/products');
  return data;
};
