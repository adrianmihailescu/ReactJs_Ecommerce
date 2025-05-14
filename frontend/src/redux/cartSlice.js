import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existing = state.find(item => item._id === product._id);

      if (existing) {
        existing.quantity += 1; // ✅ Correctly increase the quantity
      } else {
        state.push({ ...product, quantity: 1 });
      }
    },
    decreaseQuantity: (state, action) => {
      const productId = action.payload;
      const existing = state.find(item => item._id === productId);

      if (existing) {
        if (existing.quantity > 1) {
          existing.quantity -= 1; // ✅ Decrease quantity
        } else {
          return state.filter(item => item._id !== productId); // ✅ Remove if quantity is 1
        }
      }
    },
    removeFromCart: (state, action) => {
      return state.filter(item => item._id !== action.payload);
    },
    clearCart: () => [],
  },
});

export const { addToCart, decreaseQuantity, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;


// import { createSlice } from '@reduxjs/toolkit';

// const cartSlice = createSlice({
//   name: 'cart',
//   initialState: [],
//   reducers: {
//     addToCart: (state, action) => {
//       const product = action.payload;
//       const existing = state.find(item => item._id === product._id);

//       if (existing) {
//         state.push({ ...product, quantity: existing.quantity + 1 });
//       } else {
//         state.push({ ...product, quantity: 1 });
//       }
//     },
//     removeFromCart: (state, action) => {
//       return state.filter(item => item._id !== action.payload);
//     },
//     clearCart: () => [],
//   },
// });

// export const { addToCart, removeFromCart, clearCart, loadCart } = cartSlice.actions;
// export default cartSlice.reducer;


// // import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// // import API from '../api/api';

// // // Add to cart API call
// // export const addToCart = createAsyncThunk(
// //   'cart/addToCart',
// //   async (product, thunkAPI) => {
// //     const res = await API.post('/cart/add', { product });
// //     return res.data.cart;
// //   }
// // );

// // // Remove from cart API call
// // export const removeFromCart = createAsyncThunk(
// //   'cart/removeFromCart',
// //   async (productId, thunkAPI) => {
// //     const res = await API.post('/cart/remove', { productId });
// //     return res.data.cart;
// //   }
// // );

// // // Load user cart (optional)
// // export const loadCart = createAsyncThunk(
// //   'cart/loadCart',
// //   async () => {
// //     const res = await API.get('/cart');
// //     return res.data.cart;
// //   }
// // );

// // const cartSlice = createSlice({
// //   name: 'cart',
// //   initialState: [],
// //   reducers: {},
// //   extraReducers: builder => {
// //     builder
// //       .addCase(addToCart.fulfilled, (_, action) => action.payload)
// //       .addCase(removeFromCart.fulfilled, (_, action) => action.payload)
// //       .addCase(loadCart.fulfilled, (_, action) => action.payload);
// //   }
// // });

// // export default cartSlice.reducer;
