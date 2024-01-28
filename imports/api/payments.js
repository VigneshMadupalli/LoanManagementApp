import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

export const Payments = new Mongo.Collection('payments');

const PaymentSchema = new SimpleSchema({
    lenderId: {
        type: String,
        regEx: /^[0-9a-fA-F]{24}$/, // MongoDB ObjectID pattern
    },
    loanId: {
        type: String,
        regEx: /^[0-9a-fA-F]{24}$/,
    },
    amount: {
        type: Number,
    },
    createdAt: {
        type: Date,
        defaultValue: new Date(),
    },
});

Payments.attachSchema(PaymentSchema);
