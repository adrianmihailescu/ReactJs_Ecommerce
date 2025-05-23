import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../redux/cartSlice';
import { Link } from 'react-router-dom';
import './CartPage.css';
import genericProduct from '../assets/images/generic_product.png';
import { RootState } from '../redux/store';
import { AppDispatch } from '../redux/store';
import { CartItem } from '../interfaces/CartItem';

function CartPage() {
  const cart = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch<AppDispatch>();

  const total = cart.reduce((acc: number, item: CartItem) => acc + item.price * item.quantity, 0);

  const getProductLink = (item: CartItem) => {
    const link = `/product/${item._id}`;
    return (
      <Link to={link} className="product-link">
        {item.name}
      </Link>
    );
  };

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>
      {cart.length > 0 ? (
        cart.map((item: CartItem) => (
          <div key={item._id} className="cart-item">
            <h4>
              {item.quantity} x {getProductLink(item)} ({item.price} eur each)
            </h4>
            <p>
              <img
                className="product-image"
                alt={item.name}
                src={genericProduct}
                width={50}
                height={50}
              />
            </p>
            <p>${(item.price * item.quantity).toFixed(2)}</p>
            <button onClick={() => dispatch(removeFromCart(item._id))}>
              Remove
            </button>
          </div>
        ))
      ) : (
        <p>No products available. Please add one.</p>
      )}
      <h3>Total: ${total.toFixed(2)}</h3>
      <Link to="/checkout">
        <button disabled={cart.length === 0}>Proceed to Checkout</button>
      </Link>
    </div>
  );
}

export default CartPage;
