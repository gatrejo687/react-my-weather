import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './bootstrap.min.css';
import './index.css';

import App from './App';

// Import redux's Provider component
import { Provider as ReduxProvider } from 'react-redux';

// Setup Store
import configureStore from './redux/configureStore';
const store = configureStore();

// Like react-router redux needs to wrap the entire application.
// This is so react-redux's connect can access it through context
// API anywhere in the component tree.
ReactDOM.render(
  <ReduxProvider store={store}>
    <Router>
      <App />
    </Router>
  </ReduxProvider>,
  document.getElementById('root')
);
