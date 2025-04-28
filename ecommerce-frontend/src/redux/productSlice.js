import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
  name: 'products',
  initialState: [
    { _id: '1', name: 'iPhone 15', price: 999, description: 'New Apple iPhone', image: 'https://via.placeholder.com/200' },
    { _id: '2', name: 'Samsung Galaxy S23', price: 799, description: 'New Samsung Galaxy', image: 'https://via.placeholder.com/200' },
    { _id: '3', name: 'MacBook Pro', price: 1999, description: 'Apple Laptop', image: 'https://via.placeholder.com/200' },
  ],
  reducers: {},
});

export default productSlice.reducer;
