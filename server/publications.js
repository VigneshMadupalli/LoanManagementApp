import { Meteor } from 'meteor/meteor';
import { Loans } from '/imports/api/loans';

Meteor.publish('loans', function () {
  if (this.userId) {
    return Loans.find({ borrowerId: this.userId });
  }
  return this.ready();
});

Meteor.publish('allTransactions', function () {
  if (Roles.userIsInRole(this.userId, 'admin')) {
    return Loans.find({});
  }
  return this.ready();
});
