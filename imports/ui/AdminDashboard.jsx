import React, { useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import { Loans } from '/imports/api/loans';
import Graph from './AGraph'; 
import LogoutButton from './LogoutButton';


const AdminDashboard = () => {
  const [allLoans, setAllLoans] = useState([]);

  useEffect(() => {
    Meteor.subscribe('allTransactions');
    const loans = Loans.find({}).fetch();
    setAllLoans(loans);
  }, []);

  return (
    <div className="dashboard admin-dashboard">
      <LogoutButton />
      <h1>Admin Dashboard</h1>
      <Graph />
      <h2>All Loans</h2>
      {allLoans.length > 0 ? (
        <ul>
          {allLoans.map((loan) => (
            <li key={loan._id}>{`Borrower: ${loan.borrowerId}, Amount: ${loan.amountRequested}, Status: ${loan.status}`}</li>
          ))}
        </ul>
      ) : (
        <p>No loan transactions recorded yet.</p>
      )}
    </div>
  );
};

export default AdminDashboard;
