import cartReducer, { addToCart, removeFromCart, decreaseQuantity, clearCart } from '../redux/cartSlice';

describe('cartSlice Reducer', () => {
  const initialState: any[] = [];

  test('should return the initial state', () => {
    expect(cartReducer(undefined, { type: 'unknown' })).toEqual([]);
  });

  test('should add a new item to cart', () => {
    const product = { _id: '1', name: 'iPhone 15', price: 999 };
    const state = cartReducer(initialState, addToCart(product));
    expect(state).toHaveLength(1);
    expect(state[0]).toEqual({ ...product, quantity: 1 });
  });

  test('should increment quantity for existing item', () => {
    const product = { _id: '1', name: 'iPhone 15', price: 999 };
    let state = cartReducer(initialState, addToCart(product));
    state = cartReducer(state, addToCart(product));
    expect(state).toHaveLength(1);
    expect(state[0].quantity).toBe(2);
  });

  test('should add multiple different items', () => {
    const product1 = { _id: '1', name: 'iPhone 15', price: 999 };
    const product2 = { _id: '2', name: 'Samsung Galaxy', price: 899 };
    let state = cartReducer(initialState, addToCart(product1));
    state = cartReducer(state, addToCart(product2));
    expect(state).toHaveLength(2);
  });

  test('should remove item from cart', () => {
    const product = { _id: '1', name: 'iPhone 15', price: 999 };
    let state = cartReducer(initialState, addToCart(product));
    state = cartReducer(state, removeFromCart('1'));
    expect(state).toHaveLength(0);
  });

  test('should decrease item quantity', () => {
    const product = { _id: '1', name: 'iPhone 15', price: 999 };
    let state = cartReducer(initialState, addToCart(product));
    state = cartReducer(state, addToCart(product)); // qty = 2
    state = cartReducer(state, decreaseQuantity('1'));
    expect(state[0].quantity).toBe(1);
  });

  test('should remove item when quantity decreases to 0', () => {
    const product = { _id: '1', name: 'iPhone 15', price: 999 };
    let state = cartReducer(initialState, addToCart(product)); // qty = 1
    state = cartReducer(state, decreaseQuantity('1'));
    expect(state).toHaveLength(0);
  });

  test('should clear the entire cart', () => {
    const product1 = { _id: '1', name: 'iPhone 15', price: 999 };
    const product2 = { _id: '2', name: 'Samsung', price: 899 };
    let state = cartReducer(initialState, addToCart(product1));
    state = cartReducer(state, addToCart(product2));
    state = cartReducer(state, clearCart());
    expect(state).toHaveLength(0);
  });

  test('removing non-existent item does not change cart', () => {
    const product = { _id: '1', name: 'iPhone 15', price: 999 };
    let state = cartReducer(initialState, addToCart(product));
    state = cartReducer(state, removeFromCart('999'));
    expect(state).toHaveLength(1);
  });
});
