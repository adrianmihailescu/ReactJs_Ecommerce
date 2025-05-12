import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../redux/cartSlice';
import { Link } from 'react-router-dom';
import './CartPage.css';
import imageNotFound from '../assets/images/product_not_found.png';

function CartPage() {
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>
      {cart.map(item => (
        <div key={item._id} className="cart-item">
          <h4>{item.name} x {item.quantity}</h4>
          <p>
                  <img src={item.image} alt={item.name} width="50"
                  onError={(e) => {
                          e.target.onerror = null; // prevents infinite loop
                          e.target.src = imageNotFound;
                        }
                      }
                  />
          </p>
          <p>${(item.price * item.quantity).toFixed(2)}</p>
          <button onClick={() => dispatch(removeFromCart(item._id))}>
            Remove
          </button>
        </div>
      ))}
      <h3>Total: ${total.toFixed(2)}</h3>
      <Link to="/checkout">
        <button>Proceed to Checkout</button>
      </Link>
    </div>
  );
}

export default CartPage;
