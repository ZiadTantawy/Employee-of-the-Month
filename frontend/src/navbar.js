import React from 'react';
import "./CSS/nav.css";
import {Helmet} from "react-helmet";

const Navbar = () => {
  return (
    <div className="navbar">
      {/* Left side: Logo */}
      <Helmet>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />
      </Helmet>
      <div className="logo">
        <a href="/index">
          <img src="./PIC/ITWorx_logo.png" alt="Logo" width="100" height="25" />
        </a>
      </div>

      {/* Center: Navigation links */}
      <ul id="nav-links">
        <li><a href="#">Time Off</a></li>
        <li><a href="#">Benefits</a></li>
        <li><a href="#">Compensation</a></li>
        <li><a href="#">Learning</a></li>
        <li><a href="#">Feedback</a></li>
      </ul>
      <div class="actions">
            <button>
                <i class="fas fa-search"></i>
            </button>
            <button>
                <i class="fa-solid fa-question"></i>
            </button>
            <button id="auth-button" class="btn">
                <i class="fas fa-user"></i>
            </button>
        </div>
    </div>
  );
};

export default Navbar;