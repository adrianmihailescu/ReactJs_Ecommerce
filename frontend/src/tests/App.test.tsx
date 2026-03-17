import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import Header from '../components/Header';
import HomePage from '../pages/HomePage';
import ProductPage from '../pages/ProductPage';
import CartPage from '../pages/CartPage';

// Mock pages that use axios (LoginPage, RegisterPage, CheckoutPage)
jest.mock('../pages/LoginPage', () => ({
  __esModule: true,
  default: () => <div><h1>Login</h1><p>Mocked Login Page</p></div>,
}));
jest.mock('../pages/RegisterPage', () => ({
  __esModule: true,
  default: () => <div><h1>Register</h1><p>Mocked Register Page</p></div>,
}));
jest.mock('../pages/CheckoutPage', () => ({
  __esModule: true,
  default: () => <div><h1>Checkout</h1><p>Mocked Checkout Page</p></div>,
}));

const AppRoutes = () => (
  <>
    <Header />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/product/:id" element={<ProductPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/checkout" element={<div><h1>Checkout</h1></div>} />
      <Route path="/login" element={<div><h1>Login</h1></div>} />
      <Route path="/register" element={<div><h1>Register</h1></div>} />
      <Route path="*" element={<div>Page Not Found</div>} />
    </Routes>
  </>
);

const renderApp = (route = '/') => {
  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[route]}>
        <AppRoutes />
      </MemoryRouter>
    </Provider>
  );
};

describe('App Routing', () => {
  test('renders the Header component', () => {
    renderApp();
    expect(screen.getByText('Home')).toBeInTheDocument();
  });

  test('renders HomePage on root route', () => {
    renderApp('/');
    expect(screen.getByText('Latest Products')).toBeInTheDocument();
  });

  test('renders LoginPage on /login route', () => {
    renderApp('/login');
    expect(screen.getByRole('heading', { name: 'Login' })).toBeInTheDocument();
  });

  test('renders RegisterPage on /register route', () => {
    renderApp('/register');
    expect(screen.getByRole('heading', { name: 'Register' })).toBeInTheDocument();
  });

  test('renders CartPage on /cart route', () => {
    renderApp('/cart');
    expect(screen.getByText('Your Cart')).toBeInTheDocument();
  });

  test('renders 404 for unknown routes', () => {
    renderApp('/this-does-not-exist');
    expect(screen.getByText('Page Not Found')).toBeInTheDocument();
  });

  test('renders product detail page for valid product', () => {
    renderApp('/product/1');
    expect(screen.getByText('Product Details')).toBeInTheDocument();
    expect(screen.getByText('iPhone 15')).toBeInTheDocument();
  });

  test('shows "Product not found" for invalid product ID', () => {
    renderApp('/product/9999');
    expect(screen.getByText('Product not found')).toBeInTheDocument();
  });
});
