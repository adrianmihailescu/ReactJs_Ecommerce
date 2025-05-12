import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import imageNotFound from '../assets/images/product_not_found.png';
import './ProductPage.css';

function ProductPage() {
  const { id } = useParams();
  const products = useSelector(state => state.products);
  const dispatch = useDispatch();

  const product = products.find(p => p._id === id);

  if (!product) return <div className="product-card">Product not found</div>;

  return (
    <div className="product-card product-detail">
      <img
        className="product-image"
        src={product.image}
        alt={product.name}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = imageNotFound;
        }}
      />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p><strong>${product.price.toFixed(2)}</strong></p>
      <button onClick={() => dispatch(addToCart(product))}>Add to Cart</button>
            <Link to="/" className="back-to-home">
        &larr;Home
      </Link>
    </div>
  );
}

export default ProductPage;
