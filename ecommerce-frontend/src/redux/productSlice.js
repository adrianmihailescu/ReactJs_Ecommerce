import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
  name: 'products',
  initialState: [
    // Sample product data
    // todo add some images
    { _id: '1', name: 'iPhone 15', price: 1, description: 'New Apple iPhone', image: 'https://via.placeholder.com/200' },
    { _id: '2', name: 'Samsung Galaxy S23', price: 1, description: 'New Samsung Galaxy', image: 'https://via.placeholder.com/200' },
    { _id: '3', name: 'MacBook Pro', price: 1, description: 'Apple Laptop', image: 'https://via.placeholder.com/200' },
    { _id: '4', name: 'Dell XPS 13', price: 1, description: 'Ultra-portable Windows laptop with InfinityEdge display', image: 'https://via.placeholder.com/200' },
    { _id: '5', name: 'Sony WH-1000XM5', price: 1, description: 'Industry-leading noise-canceling headphones', image: 'https://via.placeholder.com/200' },
    { _id: '6', name: 'iPad Air', price: 1, description: 'Apple tablet with M1 chip and 10.9-inch Liquid Retina display', image: 'https://via.placeholder.com/200' },
    { _id: '7', name: 'Google Pixel 8', price: 1, description: 'Google smartphone with AI-powered features', image: 'https://via.placeholder.com/200' },
    { _id: '8', name: 'ASUS ROG Zephyrus G14', price: 1, description: 'High-performance gaming laptop with Ryzen processor', image: 'https://via.placeholder.com/200' },
    { _id: '9', name: 'Amazon Kindle Paperwhite', price: 1, description: 'Waterproof e-reader with a high-resolution display', image: 'https://via.placeholder.com/200' },
    { _id: '10', name: 'Logitech MX Master 3S', price: 1, description: 'Advanced wireless mouse with ergonomic design', image: 'https://via.placeholder.com/200' },
    { _id: '11', name: 'Apple Watch Series 9', price: 1, description: 'Smartwatch with health tracking and Siri integration', image: 'https://via.placeholder.com/200' },
    { _id: '12', name: 'Samsung Galaxy Tab S9', price: 1, description: 'Premium Android tablet with AMOLED display', image: 'https://via.placeholder.com/200' },
    { _id: '13', name: 'Bose SoundLink Revolve II', price: 1, description: 'Portable Bluetooth speaker with 360° sound', image: 'https://via.placeholder.com/200' }
  ],
  reducers: {},
});

export default productSlice.reducer;
