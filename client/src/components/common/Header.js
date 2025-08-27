import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const Header = ({ isAdmin, setIsAdmin }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('profile');
    setIsAdmin(false);
    navigate('/');
  };

  return (
    <header className="header">
      <div className="header-logo">
        <NavLink to="/">{`// AIML_JOURNAL`}</NavLink>
      </div>
      <nav className="nav-links">
        <NavLink to="/">Home</NavLink>
        {isAdmin && <NavLink to="/admin">Create Post</NavLink>}
        {isAdmin ? (
          <button onClick={handleLogout} className="btn-logout">Logout</button>
        ) : (
          <NavLink to="/login">Login</NavLink>
        )}
      </nav>
    </header>
  );
};

export default Header;