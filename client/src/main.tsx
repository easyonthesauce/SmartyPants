import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

// Choose voice mode: 'public' to connect by AGENT_ID directly; 'signed' to use server-signed URL; 'mock' for Web Speech demo.
const voiceMode: 'public' | 'signed' | 'mock' = 'public' // set to 'public' or 'signed' when ready

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App voiceMode={voiceMode} />
  </React.StrictMode>
)
