import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const NavBar = ({ session }) => {
  const location = useLocation();

  return (
    <header>
      <Link to="/index">
        <img src="/img/logo.jpeg" style={{ height: '65px', width: 'auto' }} alt="Logo" />
      </Link>
      <nav>
        <ul>
          {(location.pathname !== '/index' && location.pathname !== '/') && (
            <>
              <li><Link to="/buy">Buy</Link></li>
              <li><Link to="/sell">Sell</Link></li>
            </>
          )}
          {!session && (
            <li><Link to="/login">Login</Link></li>
          )}
          <li><a href="mailto:buzzbazaar13@gmail.com" target="_blank">Contact</a></li>
          {session && (
            <li><Link to="/userProfile"><i className="fas fa-user"></i> My Profile</Link></li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
