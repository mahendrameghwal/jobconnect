import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from '../app/store.js';
import App from './App.jsx';
import './index.css';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router>
        <PayPalScriptProvider
          options={{ 'client-id': 'AYZvxO4enfR5zJazw6eKk6MGxWjXW69fvWFeXPPn-Czu-jN8gl603mvPf2jefdUVIFhmOIsSmgrWK7tG' }}>
          <App />
        </PayPalScriptProvider>
      </Router>
    </PersistGate>
  </Provider>,
);
