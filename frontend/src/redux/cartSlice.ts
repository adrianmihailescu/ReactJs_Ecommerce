import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CartItem {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  [key: string]: any; // optional — covers extras like image, description, etc.
}


const initialState: CartItem[] = [];

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
addToCart: (state, action: PayloadAction<Omit<CartItem, 'quantity'>>) => {
  const product = action.payload;
  const existing = state.find(item => item._id === product._id);

  if (existing) {
    existing.quantity += 1;
  } else {
    state.push(
      { ...product, quantity: 1, _id: product._id, name: product.name, price: product.price }
    );
  }
},

    decreaseQuantity: (state, action: PayloadAction<string>) => {
      const productId = action.payload;
      const existing = state.find(item => item._id === productId);

      if (existing) {
        if (existing.quantity > 1) {
          existing.quantity -= 1;
        } else {
          return state.filter(item => item._id !== productId);
        }
      }
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      return state.filter(item => item._id !== action.payload);
    },

    clearCart: () => [],
  },
});

export const {
  addToCart,
  decreaseQuantity,
  removeFromCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
