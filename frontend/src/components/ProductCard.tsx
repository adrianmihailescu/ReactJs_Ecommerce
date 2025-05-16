import React from 'react';
import { Link } from 'react-router-dom';
import genericProduct from '../assets/images/generic_product.png';
import { Product } from '../interfaces/Product';
import { ProductCardProps } from '../interfaces/ProductCardProps';

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="product-card">
      <img alt={product.name} width={50} src={genericProduct} />
      <h3>{product.name}</h3>
      <p>${product.price.toFixed(2)}</p>
      <Link to={`/product/${product._id}`}>View Details</Link>
    </div>
  );
};

export default ProductCard;
