import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'leaflet/dist/leaflet.css';
// import 'bootswatch/dist/morph/bootstrap.min.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
