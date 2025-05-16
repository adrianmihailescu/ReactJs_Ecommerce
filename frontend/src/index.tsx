import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';
import App from './App';
import { store } from './redux/store';
import { Provider } from 'react-redux';

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  );
} else {
  throw new Error('Root element not found');
}

