import React, { useState } from 'react';
import { Accounts } from 'meteor/accounts-base';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('borrower');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setError('');

    Accounts.createUser({ email, password,profile: { role } }, (error) => {
      if (error) {
        console.error('Registration Error:', error);
        setError(error.reason || "Registration failed.");
      } else {
        navigate('/'); // Redirect to home/dashboard after registration
      }
    });
  };

  return (
    <div className="register-container">
      <div className="form-header">
        <h2>Register New Account</h2>
        <p>Start managing your loans effectively</p>
      </div>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit} className="register-form animate-fade-in">
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
        <div className="form-group">
          <label htmlFor="confirm-password">Confirm Password:</label>
          <input 
            id="confirm-password"
            type="password" 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)} 
            required 
          />
        </div>
        <select
      className="custom-select" // Apply the custom-select class to the select element
      value={role}
      onChange={(e) => setRole(e.target.value)}
    >
      <option value="borrower">Borrower</option>
      <option value="lender">Lender</option>
      <option value="admin">Admin</option>
    </select>
        <button type="submit" className="btn">Register</button>
      </form>
      <p className="switch-form">
        Already have an account? <Link to="/">Login here</Link>
      </p>
    </div>
  );
};

export default Register;
