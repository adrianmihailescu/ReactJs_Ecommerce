import { Link } from 'react-router-dom';
import genericProduct from '../assets/images/generic_product.png';

function ProductCard({ product }) {
  return (
    <div className="product-card">
      <img alt={product.name} width="50" src={genericProduct} />
      <h3>{product.name}</h3>
      <p>${product.price}</p>
      <Link to={`/product/${product._id}`}>View Details</Link>
    </div>
  );
}

export default ProductCard;
