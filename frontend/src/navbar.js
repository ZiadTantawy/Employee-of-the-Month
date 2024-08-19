import React, { useState, useEffect } from 'react';
import "./CSS/nav.css";
import { Helmet } from "react-helmet";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLoginLogout = async () => {
    if (isLoggedIn) {
      await fetch("http://localhost:8000/logout", {
        method: "POST",
        credentials: "include",
      });
      setIsLoggedIn(false);
      window.location.href = "/";
    } else {
      window.location.href = "/login";
    }
  };
  
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await fetch("http://localhost:8000/check_login_status", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        const data = await response.json();
        if (data.loggedIn) {  // Check the loggedIn property
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error("Error checking login status:", error);
        setIsLoggedIn(false); // Handle errors by assuming the user is logged out
      }
    };
  
    checkLoginStatus(); // Call the function immediately after the component mounts
  }, []);
  

  return (
    <div className="navbar">
      <Helmet>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />
      </Helmet>
      <div className="logo">
        <a href="/">
          <img src={require("./PIC/ITWorx_logo.png")} alt="Logo" width="100" height="25" />
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
        <button id="auth-button" className="btn" onClick={handleLoginLogout}>
          <i className={`fa ${isLoggedIn ? 'fa-sign-out-alt' : 'fa-user'}`}></i>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
