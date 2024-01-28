import React, { useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import { Loans } from '/imports/api/loans';
import LoanRequestForm from './LoanRequestForm';
import Graph from './AGraph';
import LogoutButton from './LogoutButton';

const BorrowerDashboard = () => {
  const [loans, setLoans] = useState([]);

  useEffect(() => {
    Meteor.subscribe('loans');
    const userLoans = Loans.find({ borrowerId: Meteor.userId() }).fetch();
    setLoans(userLoans);
  }, []);

  return (
    <div className="dashboard borrower-dashboard">
      <LogoutButton />
      <h1>Borrower Dashboard</h1>
      <LoanRequestForm />
      <Graph />
      <h2>Your Loans</h2>
      {loans.length > 0 ? (
        <ul>
          {loans.map((loan) => (
            <li key={loan._id}>{`Amount: ${loan.amountRequested}, Status: ${loan.status}`}</li>
          ))}
        </ul>
      ) : (
        <p>Begin your first loan today!</p>
      )}
    </div>
  );
};

export default BorrowerDashboard;
