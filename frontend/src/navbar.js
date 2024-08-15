import React, { useState } from 'react';
import "./CSS/nav.css";
import { Helmet } from "react-helmet";
import Login from './login';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogin = () => {
    window.location.href = "/login";
  };

  return (
    <div className="navbar">
      <Helmet>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />
      </Helmet>
      <div className="logo">
        <a href="/">
          <img src="./PIC/ITWorx_logo.png" alt="Logo" width="100" height="25" />
        </a>
      </div>

      <div className={`burger ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>
        <i className="fas fa-bars"></i>
      </div>

      <ul id="nav-links" className={isMenuOpen ? 'active' : ''}>
        <li><a href="#">Time Off</a></li>
        <li><a href="#">Benefits</a></li>
        <li><a href="#">Compensation</a></li>
        <li><a href="#">Learning</a></li>
        <li><a href="#">Feedback</a></li>
      </ul>

      <div className="actions">
        <button>
          <i className="fas fa-search"></i>
        </button>
        <button>
          <i className="fa-solid fa-question"></i>
        </button>
        <button id="auth-button" className="btn" onClick={handleLogin}>
          <i className="fas fa-user"></i>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
