import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'
import reportWebVitals from './reportWebVitals'
import store from './features'
import queryClient from './services/reactQueryClient'
import Alert from './utils/Alert'
import Navigate from './utils/Navigate'
import { QueryClientProvider } from 'react-query'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { HelmetProvider } from 'react-helmet-async'
import { ReactQueryDevtools } from 'react-query/devtools'
import { ManipulacaoDeMensagensProvider } from './layouts/provider/ManipulacaoDeMensagens'

const root = document.getElementById('root')
const rootElement = (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <BrowserRouter>
          <ManipulacaoDeMensagensProvider>
            <App />
          </ManipulacaoDeMensagensProvider>
          <Navigate />
        </BrowserRouter>
        <Alert />
      </Provider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </HelmetProvider>
)

const rootContainer = ReactDOM.createRoot(root)
rootContainer.render(rootElement)

serviceWorkerRegistration.unregister()
reportWebVitals()
