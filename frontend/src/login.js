import React from "react";
import "./CSS/login.css";

const Login = () => {
  const handleSubmit = async (event) => {
    event.preventDefault();

    const email = event.target.email.value;
    const password = event.target.password.value;

    try {
      const response = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.status === 200) {
        window.location.href = "/";
      } else {
        // Handle errors here
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Error:", error);
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
              <small className="error" id="emailError"></small>
            </div>
            <div className="input-box">
              <input
                type="password"
                placeholder="Enter your password"
                name="password"
                id="password"
                required
              />
              <small className="error" id="passwordError"></small>
            </div>
            <div className="input-box button">
              <input type="submit" value="Login" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;