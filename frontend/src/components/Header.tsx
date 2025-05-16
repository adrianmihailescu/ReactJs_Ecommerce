import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch, TypedUseSelectorHook } from 'react-redux';
import { logout } from '../redux/authSlice';
import type { RootState, AppDispatch } from '../redux/store';

const Header: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  // Typed selector
  const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

  const cart = useTypedSelector(state => state.cart);
  const user = useTypedSelector(state => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <header>
      <nav>
        <Link to="/">Home</Link> |{' '}
        <Link to="/cart">Cart ({cart.length})</Link> |{' '}
        {user ? (
          <>
            <span style={{ color: 'white' }}>Hello, {user.name}</span> |{' '}
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>{' '}
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
