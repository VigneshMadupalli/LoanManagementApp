import React from "react";
import { Link } from "react-router-dom"; // Assuming you use React Router

function WelcomePage() {
  return (
    <div className="welcome-container">
      <h1>Welcome to Our Website</h1>
      <p>Explore our services and features.</p>
      <div className="action-buttons">
        <Link to="/login" className="btn">
          Log In
        </Link>
        <Link to="/register" className="btn primary">
          New User
        </Link>
      </div>
    </div>
  );
}

export default WelcomePage;
