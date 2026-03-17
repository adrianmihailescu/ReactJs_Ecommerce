import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../redux/cartSlice';
import productReducer from '../redux/productSlice';
import authReducer from '../redux/authSlice';

// Mock the API module to avoid axios ESM issues
jest.mock('../api/api', () => ({
  __esModule: true,
  default: {
    post: jest.fn(),
    get: jest.fn(),
    create: jest.fn(),
  },
}));

import RegisterPage from '../pages/RegisterPage';

const createTestStore = () => {
  return configureStore({
    reducer: {
      cart: cartReducer,
      products: productReducer,
      auth: authReducer,
    },
  });
};

const renderRegisterPage = () => {
  return render(
    <Provider store={createTestStore()}>
      <MemoryRouter>
        <RegisterPage />
      </MemoryRouter>
    </Provider>
  );
};

describe('RegisterPage Component', () => {
  test('renders Register heading', () => {
    renderRegisterPage();
    expect(screen.getByRole('heading', { name: 'Register' })).toBeInTheDocument();
  });

  test('renders Name input field', () => {
    renderRegisterPage();
    expect(screen.getByPlaceholderText('Name')).toBeInTheDocument();
  });

  test('renders Email input field', () => {
    renderRegisterPage();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
  });

  test('renders Password input field', () => {
    renderRegisterPage();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
  });

  test('renders Register submit button', () => {
    renderRegisterPage();
    expect(screen.getByRole('button', { name: 'Register' })).toBeInTheDocument();
  });

  test('name input accepts text', () => {
    renderRegisterPage();
    const nameInput = screen.getByPlaceholderText('Name') as HTMLInputElement;
    fireEvent.change(nameInput, { target: { value: 'Adrian' } });
    expect(nameInput.value).toBe('Adrian');
  });

  test('email input accepts email', () => {
    renderRegisterPage();
    const emailInput = screen.getByPlaceholderText('Email') as HTMLInputElement;
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    expect(emailInput.value).toBe('test@example.com');
  });

  test('all fields are required', () => {
    renderRegisterPage();
    expect(screen.getByPlaceholderText('Name')).toBeRequired();
    expect(screen.getByPlaceholderText('Email')).toBeRequired();
    expect(screen.getByPlaceholderText('Password')).toBeRequired();
  });
});
