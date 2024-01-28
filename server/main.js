import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';

// Customizing user creation
Accounts.onCreateUser((options, user) => {
  // Ensure options is an object
  if (!options || typeof options !== 'object') {
    options = {};
  }

  // Use the provided profile or create an empty object
  user.profile = options.profile || {};

  // Assign a role to the user (default to 'borrower')
  user.profile.role = options.profile && options.profile.role ? options.profile.role : 'borrower';

  // Return the new user object
  return user;
});

Meteor.methods({
  'getPassword': function (email) {
    // This method is a placeholder. Replace with secure logic for password retrieval/reset.
    const user = Accounts.findUserByEmail(email);
    if (user) {
      return "MockPassword123"; // Placeholder
    } else {
      throw new Meteor.Error('user-not-found', 'User not found');
    }
  }
});

// Additional server-side logic (if any)
