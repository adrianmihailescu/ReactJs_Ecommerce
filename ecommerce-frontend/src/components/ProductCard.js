import { Link } from 'react-router-dom';
import imageNotFound from '../assets/images/product_not_found.png';

function ProductCard({ product }) {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} width="50"
      onError={(e) => {
              e.target.onerror = null; // prevents infinite loop
              e.target.src = imageNotFound;
            }
          }
      />
      <h3>{product.name}</h3>
      <p>${product.price}</p>
      <Link to={`/product/${product._id}`}>View Details</Link>
    </div>
  );
}

export default ProductCard;
