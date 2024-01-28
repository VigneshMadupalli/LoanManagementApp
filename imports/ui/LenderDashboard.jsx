import React, { useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import { Loans } from '/imports/api/loans';
import Graph from './AGraph';
import LogoutButton from './LogoutButton';

const LenderDashboard = () => {
  const [availableLoans, setAvailableLoans] = useState([]);

  useEffect(() => {
    Meteor.subscribe('loans');
    const loansToFund = Loans.find({ status: 'requested' }).fetch();
    setAvailableLoans(loansToFund);
  }, []);

  const handleFundLoan = (loanId) => {
    Meteor.call('loans.fund', loanId, (error) => {
      if (error) {
        alert(error.message);
      } else {
        alert('Loan funded successfully!');
      }
    });
  };

  return (
    <div className="dashboard lender-dashboard">
      <LogoutButton />
      <h1>Lender Dashboard</h1>
      <Graph />
      <h2>Available Loans to Fund</h2>
      {availableLoans.length > 0 ? (
        <ul>
          {availableLoans.map((loan) => (
            <li key={loan._id}>
              {`Amount: ${loan.amountRequested}`}
              <button onClick={() => handleFundLoan(loan._id)}>Fund Loan</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No loans available to fund at the moment.</p>
      )}
    </div>
  );
};

export default LenderDashboard;
