import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx' // Make sure this points to your App component file
import './index.css' // Ensure your CSS file with Tailwind directives is imported

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
