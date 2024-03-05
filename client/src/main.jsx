import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { ApiProvider } from './components/ApiProvider.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ApiProvider baseUrl="http://localhost:3001/api">
      <App />
    </ApiProvider>
  </React.StrictMode>,
);
