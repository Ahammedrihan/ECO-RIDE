import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import store from '../Redux/store/store.js'


import Swal from 'sweetalert2';
import { Provider } from 'react-redux';

// Initialize SweetAlert with global configuration options
Swal.fire({
  // configuration options here
});


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)
