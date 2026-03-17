import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

const mockProduct = {
  _id: '1',
  name: 'iPhone 15',
  price: 999.99,
  description: 'New Apple iPhone',
};

const renderProductCard = (product = mockProduct) => {
  return render(
    <MemoryRouter>
      <ProductCard product={product} />
    </MemoryRouter>
  );
};

describe('ProductCard Component', () => {
  test('renders product name', () => {
    renderProductCard();
    expect(screen.getByText('iPhone 15')).toBeInTheDocument();
  });

  test('renders product price with dollar sign', () => {
    renderProductCard();
    expect(screen.getByText('$999.99')).toBeInTheDocument();
  });

  test('renders View Details link', () => {
    renderProductCard();
    const link = screen.getByText('View Details');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/product/1');
  });

  test('renders product image with alt text', () => {
    renderProductCard();
    const img = screen.getByAltText('iPhone 15');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('width', '50');
  });

  test('renders correctly with zero price', () => {
    renderProductCard({ ...mockProduct, price: 0, _id: '99', name: 'Free Item' });
    expect(screen.getByText('$0.00')).toBeInTheDocument();
  });

  test('link points to correct product detail page', () => {
    renderProductCard({ ...mockProduct, _id: '42' });
    expect(screen.getByText('View Details')).toHaveAttribute('href', '/product/42');
  });
});
