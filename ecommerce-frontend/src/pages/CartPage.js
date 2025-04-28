import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../redux/cartSlice';
import { Link } from 'react-router-dom';

function CartPage() {
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div>
      <h1>Your Cart</h1>
      {cart.map(item => (
        <div key={item._id}>
          <h4>{item.name} x {item.quantity}</h4>
          <p>${item.price * item.quantity}</p>
          <button onClick={() => dispatch(removeFromCart(item._id))}>Remove</button>
        </div>
      ))}
      <h3>Total: ${total}</h3>
      <Link to="/checkout"><button>Proceed to Checkout</button></Link>
    </div>
  );
}

export default CartPage;
