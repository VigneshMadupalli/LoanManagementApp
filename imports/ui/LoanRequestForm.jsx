import React, { useState } from 'react';
import { Loans } from '/imports/api/loans';
import { Meteor } from 'meteor/meteor';

const LoanRequestForm = () => {
  const [amountRequested, setAmountRequested] = useState('');
  const [isRequestActive, setIsRequestActive] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const userId = Meteor.userId();
    if (!userId) {
      alert("You must be logged in to post a loan request.");
      return;
    }

    if (!isRequestActive) {
      Loans.insert({
        borrowerId: userId,
        amountRequested: parseFloat(amountRequested),
        status: 'awaiting lender',
      }, (error) => {
        if (!error) {
          setIsRequestActive(true);
          setAmountRequested('');
        } else {
          console.error('Error posting loan request:', error);
        }
      });
    }
  };

  const handleAmountChange = (e) => {
    if (!isRequestActive) {
      setAmountRequested(e.target.value);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        value={amountRequested}
        onChange={handleAmountChange}
        placeholder="Amount Requested"
        disabled={isRequestActive}
        required
      />
      <button type="submit" disabled={isRequestActive}>Post Loan Request</button>
    </form>
  );
};

export default LoanRequestForm;
