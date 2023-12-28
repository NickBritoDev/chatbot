import 'react-chat-widget/lib/styles.css'
import '@ionic/react/css/core.css'
import '@fontsource/poppins'
import React from 'react'
import Router from './routers'
import { setupIonicReact } from '@ionic/react'

setupIonicReact()
export default function App () {
  return <Router />
}
