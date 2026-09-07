import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './fonts.css'
import './index.css'
import App from './App.jsx'
import { initAnalytics } from './v2/analytics.js'

/* Olcum uygulamadan once baslatiliyor ama React'i beklemiyor: script
   defer ile iniyor, ilk cizimi geciktirmiyor. Anahtar yoksa hicbir sey
   olmuyor (bkz. src/v2/analytics.js). */
initAnalytics()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
