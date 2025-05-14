import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { addToCart } from '../redux/cartSlice';
import genericProduct from '../assets/images/generic_product.png';
import './ProductPage.css';

function ProductPage() {
  const { id } = useParams();
  const products = useSelector(state => state.products);
  const dispatch = useDispatch();
  const [showPopup, setShowPopup] = useState(false);

  const product = products.find(p => p._id === id);
  if (!product) return <div className="product-card">Product not found</div>;

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 2000);
  };

  return (
    <div className="product-page">
      <h1>Product Details</h1>
      <div className="product-card product-detail">
        <img
          className="product-image"
          alt={product.name}
          src={genericProduct}
        />
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <p><strong>${product.price.toFixed(2)}</strong></p>
        <button onClick={handleAddToCart}>Add to Cart</button>
        <Link to="/" className="back-to-home">&larr; Home</Link>
      </div>

      {showPopup && (
        <div className="popup-message">
          {product.name} has been added to the cart!
        </div>
      )}
    </div>
  );
}

export default ProductPage;
