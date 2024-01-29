import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(''); // Add error state
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    Meteor.loginWithPassword(email, password, (error) => {
      if (error) {
        setError('Invalid email or password.'); // Set error message
        console.error('Login Error:', error);
      } else {
        const user = Meteor.user();
        switch (user.profile.role) {
          case 'admin':
            navigate('/admin-dashboard');
            break;
          case 'lender':
            navigate('/lender-dashboard');
            break;
          case 'borrower':
            navigate('/borrower-dashboard');
            break;
          default:
            console.log('User role not defined');
            break;
        }
      }
    });
  };

  const handleForgotPassword = () => {
    // Logic to retrieve and show password (simplified for this example)
    Meteor.call('getPassword', email, (error, result) => {
      if (error) {
        console.error('Error retrieving password:', error);
      } else {
        setShowPassword(result);
      }
    });
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input 
            id="email"
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input 
            id="password"
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        <button type="submit" className="btn">Login</button>
        </form>
      <button onClick={() => setShowPassword(!showPassword)} className="btn">
        {showPassword ? "Hide Password" : "Show Password"}
      </button>
      {showPassword && <p>Your password is: {password}</p>}
      <p>
        New user? <Link to="/register">Register here</Link>
      </p>
    </div>
    
  );
};

export default Login;