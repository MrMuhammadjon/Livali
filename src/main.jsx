import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AppContextProvider } from './Context/AppContext.jsx'
import {store} from './App/store.js'
import { Provider } from 'react-redux'
import Router from './Router/Router.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <AppContextProvider>
        <Router />
      </AppContextProvider>
    </Provider>
  </StrictMode>,
)
