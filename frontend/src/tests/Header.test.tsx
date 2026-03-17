import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../redux/cartSlice';
import productReducer from '../redux/productSlice';
import authReducer from '../redux/authSlice';
import Header from '../components/Header';

const createTestStore = (preloadedState?: any) => {
  return configureStore({
    reducer: {
      cart: cartReducer,
      products: productReducer,
      auth: authReducer,
    },
    preloadedState,
  });
};

const renderHeader = (store?: any) => {
  const testStore = store || createTestStore();
  return render(
    <Provider store={testStore}>
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    </Provider>
  );
};

describe('Header Component', () => {
  test('renders Home link', () => {
    renderHeader();
    expect(screen.getByText('Home')).toBeInTheDocument();
  });

  test('renders Cart link with item count of 0', () => {
    renderHeader();
    expect(screen.getByText('Cart (0)')).toBeInTheDocument();
  });

  test('renders Login and Register links when user is not logged in', () => {
    renderHeader();
    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByText('Register')).toBeInTheDocument();
  });

  test('renders user greeting and Logout button when user is logged in', () => {
    const store = createTestStore({
      cart: [],
      products: [],
      auth: { user: { _id: '1', name: 'Adrian', email: 'adrian@test.com' } },
    });
    renderHeader(store);
    expect(screen.getByText('Hello, Adrian')).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();
  });

  test('does not render Login/Register when user is logged in', () => {
    const store = createTestStore({
      cart: [],
      products: [],
      auth: { user: { _id: '1', name: 'Adrian', email: 'adrian@test.com' } },
    });
    renderHeader(store);
    expect(screen.queryByText('Login')).not.toBeInTheDocument();
    expect(screen.queryByText('Register')).not.toBeInTheDocument();
  });

  test('dispatches logout when Logout button is clicked', () => {
    const store = createTestStore({
      cart: [],
      products: [],
      auth: { user: { _id: '1', name: 'Adrian', email: 'adrian@test.com' } },
    });
    renderHeader(store);
    fireEvent.click(screen.getByText('Logout'));
    expect(store.getState().auth.user).toBeNull();
  });

  test('cart count updates with items in cart', () => {
    const store = createTestStore({
      cart: [
        { _id: '1', name: 'iPhone', price: 999, quantity: 2 },
        { _id: '2', name: 'Samsung', price: 899, quantity: 1 },
      ],
      products: [],
      auth: { user: null },
    });
    renderHeader(store);
    expect(screen.getByText('Cart (2)')).toBeInTheDocument();
  });
});
