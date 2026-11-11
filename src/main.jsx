import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import App from './App.jsx'
import PreferenciasProvider from './contexts/PreferenciasProvider.jsx'
import AuthProvider from './contexts/AuthProvider.jsx'
import ProgressoProvider from './contexts/ProgressoProvider.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PreferenciasProvider>
      <AuthProvider>
        <ProgressoProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ProgressoProvider>
      </AuthProvider>
    </PreferenciasProvider>
  </StrictMode>,
)
