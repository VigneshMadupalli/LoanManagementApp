import { Meteor } from 'meteor/meteor';
import { Loans } from './loans';

Meteor.methods({
  'loans.request'(amount) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Loans.insert({
      borrowerId: this.userId,
      amountRequested: amount,
      status: 'requested',
      createdAt: new Date(), // Stores the time of request
    });
  },
});
