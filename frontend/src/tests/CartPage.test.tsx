import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../redux/cartSlice';
import productReducer from '../redux/productSlice';
import authReducer from '../redux/authSlice';
import CartPage from '../pages/CartPage';

const createTestStore = (cartItems: any[] = []) => {
  return configureStore({
    reducer: {
      cart: cartReducer,
      products: productReducer,
      auth: authReducer,
    },
    preloadedState: {
      cart: cartItems,
      auth: { user: null },
    },
  });
};

const renderCartPage = (cartItems: any[] = []) => {
  const store = createTestStore(cartItems);
  return { store, ...render(
    <Provider store={store}>
      <MemoryRouter>
        <CartPage />
      </MemoryRouter>
    </Provider>
  )};
};

describe('CartPage Component', () => {
  test('renders "Your Cart" heading', () => {
    renderCartPage();
    expect(screen.getByText('Your Cart')).toBeInTheDocument();
  });

  test('shows empty cart message when no items', () => {
    renderCartPage();
    expect(screen.getByText('No products available. Please add one.')).toBeInTheDocument();
  });

  test('renders cart items when present', () => {
    renderCartPage([
      { _id: '1', name: 'iPhone 15', price: 999, quantity: 1 },
    ]);
    expect(screen.getByText('iPhone 15')).toBeInTheDocument();
  });

  test('calculates total correctly for single item', () => {
    renderCartPage([
      { _id: '1', name: 'iPhone 15', price: 999, quantity: 2 },
    ]);
    expect(screen.getByText('Total: $1998.00')).toBeInTheDocument();
  });

  test('calculates total correctly for multiple items', () => {
    renderCartPage([
      { _id: '1', name: 'iPhone 15', price: 100, quantity: 2 },
      { _id: '2', name: 'Samsung', price: 50, quantity: 3 },
    ]);
    // 100*2 + 50*3 = 350
    expect(screen.getByText('Total: $350.00')).toBeInTheDocument();
  });

  test('Remove button removes item from cart', () => {
    const { store } = renderCartPage([
      { _id: '1', name: 'iPhone 15', price: 999, quantity: 1 },
    ]);
    fireEvent.click(screen.getByText('Remove'));
    expect(store.getState().cart).toHaveLength(0);
  });

  test('Proceed to Checkout button is disabled when cart is empty', () => {
    renderCartPage();
    expect(screen.getByText('Proceed to Checkout')).toBeDisabled();
  });

  test('Proceed to Checkout button is enabled when cart has items', () => {
    renderCartPage([
      { _id: '1', name: 'iPhone 15', price: 999, quantity: 1 },
    ]);
    expect(screen.getByText('Proceed to Checkout')).not.toBeDisabled();
  });

  test('renders product link for each cart item', () => {
    renderCartPage([
      { _id: '1', name: 'iPhone 15', price: 999, quantity: 1 },
    ]);
    const link = screen.getByRole('link', { name: 'iPhone 15' });
    expect(link).toHaveAttribute('href', '/product/1');
  });

  test('shows total of $0.00 for empty cart', () => {
    renderCartPage();
    expect(screen.getByText('Total: $0.00')).toBeInTheDocument();
  });
});
