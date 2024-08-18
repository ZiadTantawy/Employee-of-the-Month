import React, { useState } from "react";
import "./CSS/login.css";

const Login = () => {
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const email = event.target.email.value;
    const password = event.target.password.value;
  
    // Basic client-side validation
    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }
  
    try {
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });
  
      if (response.status === 200) {
        window.location.href = "/";
      } else if (response.status === 422) {
        const result = await response.json();
        setError(result.message || "Invalid input. Please check your data.");
      } else {
        const result = await response.json();
        setError(result.message || "An unexpected error occurred. Please try again later.");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div>
      <div className="content">
        <div className="wrapper">
          <h2>Login</h2>
          <form id="loginForm" onSubmit={handleSubmit}>
            <div className="input-box">
              <input
                type="text"
                placeholder="Enter your email"
                name="email"
                id="email"
                required
              />
            </div>
            <div className="input-box">
              <input
                type="password"
                placeholder="Enter your password"
                name="password"
                id="password"
                required
              />
            </div>
            <div className="input-box button">
              <input type="submit" value="Login" />
            </div>
            {error && <p className="error">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
