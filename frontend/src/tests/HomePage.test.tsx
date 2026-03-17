import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../redux/cartSlice';
import productReducer from '../redux/productSlice';
import authReducer from '../redux/authSlice';
import HomePage from '../pages/HomePage';

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

const renderHomePage = (store?: any) => {
  const testStore = store || createTestStore();
  return render(
    <Provider store={testStore}>
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    </Provider>
  );
};

describe('HomePage Component', () => {
  test('renders "Latest Products" heading', () => {
    renderHomePage();
    expect(screen.getByText('Latest Products')).toBeInTheDocument();
  });

  test('renders product cards from store', () => {
    renderHomePage();
    // Default store has 13 products; page 1 shows 8
    expect(screen.getByText('iPhone 15')).toBeInTheDocument();
    expect(screen.getByText('Samsung Galaxy S23')).toBeInTheDocument();
  });

  test('renders search input', () => {
    renderHomePage();
    expect(screen.getByPlaceholderText('Search by name...')).toBeInTheDocument();
  });

  test('renders pagination controls', () => {
    renderHomePage();
    expect(screen.getByText('Previous')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
  });

  test('Previous button is disabled on first page', () => {
    renderHomePage();
    expect(screen.getByText('Previous')).toBeDisabled();
  });

  test('Next button navigates to page 2', () => {
    renderHomePage();
    fireEvent.click(screen.getByText('Next'));
    expect(screen.getByText(/Page 2/)).toBeInTheDocument();
  });

  test('search filters products by name', () => {
    renderHomePage();
    const searchInput = screen.getByPlaceholderText('Search by name...');
    fireEvent.change(searchInput, { target: { value: 'MacBook' } });
    expect(screen.getByText('MacBook Pro')).toBeInTheDocument();
    expect(screen.queryByText('iPhone 15')).not.toBeInTheDocument();
  });

  test('shows "No products found" for unmatched search', () => {
    renderHomePage();
    const searchInput = screen.getByPlaceholderText('Search by name...');
    fireEvent.change(searchInput, { target: { value: 'xyznonexistent' } });
    expect(screen.getByText('No products found')).toBeInTheDocument();
  });

  test('search is case-insensitive', () => {
    renderHomePage();
    const searchInput = screen.getByPlaceholderText('Search by name...');
    fireEvent.change(searchInput, { target: { value: 'iphone' } });
    expect(screen.getByText('iPhone 15')).toBeInTheDocument();
  });

  test('pagination resets to page 1 on search', () => {
    renderHomePage();
    fireEvent.click(screen.getByText('Next'));
    const searchInput = screen.getByPlaceholderText('Search by name...');
    fireEvent.change(searchInput, { target: { value: 'Samsung' } });
    expect(screen.getByText(/Page 1/)).toBeInTheDocument();
  });

  test('shows correct page count text', () => {
    renderHomePage();
    // 13 products / 8 per page = 2 pages
    expect(screen.getByText('Page 1 of 2')).toBeInTheDocument();
  });

  test('shows empty store message', () => {
    const store = createTestStore({
      cart: [],
      products: [],
      auth: { user: null },
    });
    renderHomePage(store);
    expect(screen.getByText('No products found')).toBeInTheDocument();
  });
});
