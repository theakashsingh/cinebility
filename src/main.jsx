import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div className='unknown'></div>
    <App />
    <div className='unknown'></div>
  </React.StrictMode>,
)
