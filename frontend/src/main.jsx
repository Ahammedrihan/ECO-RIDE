import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import Swal from 'sweetalert2';

// Initialize SweetAlert with global configuration options
Swal.fire({
  // configuration options here
});


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
