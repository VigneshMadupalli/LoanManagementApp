import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '/imports/ui/Login';
import Register from '/imports/ui/Register';
import BorrowerDashboard from '/imports/ui/BorrowerDashboard';
import LenderDashboard from '/imports/ui/LenderDashboard';
import AdminDashboard from '/imports/ui/AdminDashboard'; // Make sure this import is correct

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/borrower-dashboard" element={<BorrowerDashboard />} />
        <Route path="/lender-dashboard" element={<LenderDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
};
Meteor.startup(() => {
  const container = document.getElementById('react-target');
  const root = createRoot(container);
  root.render(<App />);
});
