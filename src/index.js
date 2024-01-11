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
// import { ManipulacaoDeMensagensProvider } from './layouts/provider/ManipulacaoDeMensagens'

import { setupIonicReact } from '@ionic/react'

import '@ionic/react/css/core.css'
import '@ionic/react/css/normalize.css'
import '@ionic/react/css/text-transformation.css'
import '@ionic/react/css/typography.css'
import '@ionic/react/css/display.css'
import '@ionic/react/css/float-elements.css'
import '@ionic/react/css/structure.css'
import '@ionic/react/css/text-alignment.css'
import '@ionic/react/css/padding.css'
import '@ionic/react/css/flex-utils.css'
import { ChakraProvider } from '@chakra-ui/react'

const root = document.getElementById('root')
const rootElement = (
  <ChakraProvider>
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <BrowserRouter>
            {/* <ManipulacaoDeMensagensProvider> */}
            <App />
            {/* </ManipulacaoDeMensagensProvider> */}
            <Navigate />
          </BrowserRouter>
          <Alert />
        </Provider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </HelmetProvider>
  </ChakraProvider>
)

const rootContainer = ReactDOM.createRoot(root)
rootContainer.render(rootElement)

serviceWorkerRegistration.unregister()
reportWebVitals()
setupIonicReact()
