
import { Meteor } from 'meteor/meteor';
import { createRoot } from 'react-dom'; // Import createRoot
import App from '../imports/ui/App'; // Import your main application component

Meteor.startup(() => {
  // Render your React app using createRoot
  const root = createRoot(document.getElementById('app')); // Replace 'app' with your root element ID
  root.render(<App />); // Use your main application component
});
