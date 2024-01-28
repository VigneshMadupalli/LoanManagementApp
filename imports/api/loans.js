import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

export const Loans = new Mongo.Collection('loans');

// MongoDB ObjectID pattern
const ObjectIdRegEx = /^[0-9a-fA-F]{24}$/;

const LoanSchema = new SimpleSchema({
  borrowerId: {
    type: String,
    regEx: ObjectIdRegEx,
  },
  amountRequested: {
    type: Number,
  },
  status: {
    type: String,
    allowedValues: ['requested', 'awaiting lender', 'funded'],
    defaultValue: 'requested',
  },
  // Add other necessary fields
});

Loans.attachSchema(LoanSchema);
