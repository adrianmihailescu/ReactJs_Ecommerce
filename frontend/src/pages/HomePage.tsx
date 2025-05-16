import React, { useState, ChangeEvent } from 'react';
import { useSelector } from 'react-redux';
import ProductCard from '../components/ProductCard';
import './HomePage.css';
import { itemsPerPage } from '../config';
import type { RootState } from '../redux/store';
import { Product } from '../interfaces/Product';

const HomePage: React.FC = () => {
  const products = useSelector((state: RootState) => state.products) as Product[];

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Filter products based on search term
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="homepage-container">
      <h1>Latest Products</h1>

      <div className="search-bar-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      <div className="products-grid">
        {currentProducts.length > 0 ? (
          currentProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <div className="no-products">No products found</div>
        )}
      </div>

      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages || 1}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages || totalPages === 0}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default HomePage;
