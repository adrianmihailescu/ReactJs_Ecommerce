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

// Now import LoginPage after mock
import LoginPage from '../pages/LoginPage';

const createTestStore = () => {
  return configureStore({
    reducer: {
      cart: cartReducer,
      products: productReducer,
      auth: authReducer,
    },
  });
};

const renderLoginPage = () => {
  return render(
    <Provider store={createTestStore()}>
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    </Provider>
  );
};

describe('LoginPage Component', () => {
  test('renders Login heading', () => {
    renderLoginPage();
    expect(screen.getByRole('heading', { name: 'Login' })).toBeInTheDocument();
  });

  test('renders email input field', () => {
    renderLoginPage();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
  });

  test('renders password input field', () => {
    renderLoginPage();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
  });

  test('renders Login submit button', () => {
    renderLoginPage();
    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
  });

  test('email input accepts input', () => {
    renderLoginPage();
    const emailInput = screen.getByPlaceholderText('Email') as HTMLInputElement;
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    expect(emailInput.value).toBe('test@example.com');
  });

  test('password input accepts input', () => {
    renderLoginPage();
    const passInput = screen.getByPlaceholderText('Password') as HTMLInputElement;
    fireEvent.change(passInput, { target: { value: 'mypassword' } });
    expect(passInput.value).toBe('mypassword');
  });

  test('email input has type="email"', () => {
    renderLoginPage();
    expect(screen.getByPlaceholderText('Email')).toHaveAttribute('type', 'email');
  });

  test('password input has type="password"', () => {
    renderLoginPage();
    expect(screen.getByPlaceholderText('Password')).toHaveAttribute('type', 'password');
  });

  test('both fields are required', () => {
    renderLoginPage();
    expect(screen.getByPlaceholderText('Email')).toBeRequired();
    expect(screen.getByPlaceholderText('Password')).toBeRequired();
  });
});
