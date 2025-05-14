import { createSlice } from '@reduxjs/toolkit';
const productImage = 'assets/images/products/generic_product.png';

const productSlice = createSlice({
  name: 'products',
  initialState: [
    { _id: '1', name: 'iPhone 15', price: 1, description: 'New Apple iPhone', image: productImage },
    { _id: '2', name: 'Samsung Galaxy S23', price: 1, description: 'New Samsung Galaxy', image: productImage },
    { _id: '3', name: 'MacBook Pro', price: 11, description: 'Apple Laptop', image: productImage },
    { _id: '4', name: 'Dell XPS 13', price: 1, description: 'Ultra-portable Windows laptop with InfinityEdge display', image: productImage },
    { _id: '5', name: 'Sony WH-1000XM5', price: 23, description: 'Industry-leading noise-canceling headphones', image: productImage },
    { _id: '6', name: 'iPad Air', price: 21, description: 'Apple tablet with M1 chip and 10.9-inch Liquid Retina display', image: productImage },
    { _id: '7', name: 'Google Pixel 8', price: 35, description: 'Google smartphone with AI-powered features', image: productImage },
    { _id: '8', name: 'ASUS ROG Zephyrus G14', price: 10, description: 'High-performance gaming laptop with Ryzen processor', image: productImage },
    { _id: '9', name: 'Amazon Kindle Paperwhite', price: 175, description: 'Waterproof e-reader with a high-resolution display', image: productImage },
    { _id: '10', name: 'Logitech MX Master 3S', price: 1, description: 'Advanced wireless mouse with ergonomic design', image: productImage },
    { _id: '11', name: 'Apple Watch Series 9', price: 34, description: 'Smartwatch with health tracking and Siri integration', image: productImage },
    { _id: '12', name: 'Samsung Galaxy Tab S9', price: 89, description: 'Premium Android tablet with AMOLED display', image: productImage },
    { _id: '13', name: 'Bose SoundLink Revolve II', price: 15, description: 'Portable Bluetooth speaker with 360° sound', image: productImage }
  ],
  reducers: {},
});

export default productSlice.reducer;
