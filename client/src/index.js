import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/css/main.css'; // This is the path to our cool new CSS
import App from './App';

// This line looks for the <div id="root"></div> in your HTML.
const root = ReactDOM.createRoot(document.getElementById('root'));

// This line tells React to render your entire App inside that div.
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);