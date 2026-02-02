import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import { SalesProvider } from './context/SalesContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <CartProvider>
        <SalesProvider>
          <App />
        </SalesProvider>
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>,
)
