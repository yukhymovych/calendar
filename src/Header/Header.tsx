import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const { pathname } = useLocation();
  const isActiveDashboard = pathname === "/";
  const isActiveCalendar = pathname === "/calendar";

  return (
    <div className="header">
      <div className="logo">
        <span>M</span>agnificent Calendar
      </div>
      <div className="header-links">
        <Link to="/">
          <span className={`link ${isActiveDashboard && "active"}`}>Dashboard</span>
        </Link>
        <Link to="/calendar">
          <span className={`link ${isActiveCalendar && "active"}`}>
            Calendar
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Header;
