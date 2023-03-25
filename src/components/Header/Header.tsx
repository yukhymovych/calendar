import React, { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { signOut } from 'firebase/auth';

import { auth } from '../../firebase/config';
import { useAuthContext } from '../../context/auth-provider';

import './Header.css';

export const Header: FC = () => {
  const { isLoggedIn } = useAuthContext();
  const { pathname } = useLocation();
  const isActiveDashboard = pathname === '/';
  const isActiveCalendar = pathname === '/calendar';

  const handleLogout = () => {
    signOut(auth).catch((error) => console.log('Log out error: ', error));
  };

  return (
    <div className="header-container">
      <div className="logo">
        <span>M</span>agnificent Calendar
      </div>
      <div className="header-links">
        <Link to="/">
          <span className={`link ${isActiveDashboard && 'active'}`}>
            Dashboard
          </span>
        </Link>
        <Link to="/calendar">
          <span className={`link ${isActiveCalendar && 'active'}`}>
            Calendar
          </span>
        </Link>
      </div>
      {isLoggedIn && (
        <div className="header-links header-links-logout">
          <span className="link" onClick={handleLogout}>
            Logout
          </span>
        </div>
      )}
    </div>
  );
};
