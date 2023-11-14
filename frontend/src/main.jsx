import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import store from '../Redux/store/store.js'
import { GoogleOAuthProvider } from '@react-oauth/google';

import 'mapbox-gl/dist/mapbox-gl.css';

import Swal from 'sweetalert2';
import { Provider } from 'react-redux';

// Initialize SweetAlert with global configuration options
Swal.fire({
  // configuration options here
});


ReactDOM.createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId="119511247942-tqsfu3oal1sv6mgth1an73l8vev8i6dp.apps.googleusercontent.com">
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
  </GoogleOAuthProvider>
)
