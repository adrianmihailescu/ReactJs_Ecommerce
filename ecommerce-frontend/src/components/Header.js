import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Header() {
  const cart = useSelector(state => state.cart);

  return (
    <header>
      <nav>
        <Link to="/">Home</Link> | {" "}
        <Link to="/cart">Cart ({cart.length})</Link> | {" "}
        <Link to="/login">Login</Link>
      </nav>
    </header>
  );
}

export default Header;
