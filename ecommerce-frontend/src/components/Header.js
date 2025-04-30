import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';

function Header() {
  const cart = useSelector(state => state.cart);
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <header>
      <nav>
        <Link to="/">Home</Link> | {" "}
        <Link to="/cart">Cart ({cart.length})</Link> | {" "}
        {user ? (
          <>
            <span style={{ color: 'white' }}>Hello, {user.name}</span> | {" "}
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
