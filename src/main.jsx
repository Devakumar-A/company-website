import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './styles/index.css'
import App, { preloadRoute } from './App.jsx'

const rootElement = document.getElementById('root')

async function mount() {
  if (rootElement && rootElement.hasChildNodes()) {
    try {
      await preloadRoute(window.location.pathname)
    } catch (err) {
      console.warn('Failed to preload initial route chunk:', err)
    }
    hydrateRoot(
      rootElement,
      <StrictMode>
        <App />
      </StrictMode>,
      {
        onRecoverableError(error, errorInfo) {
          console.error('HYDRATION ERROR DETAILS:', error?.message || error, errorInfo?.componentStack);
        },
      },
    )
  } else if (rootElement) {
    createRoot(rootElement).render(
      <StrictMode>
        <App />
      </StrictMode>,
    )
  }
}

mount()
