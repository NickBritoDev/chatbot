import React, { useEffect, useState } from 'react'
import 'react-chat-widget/lib/styles.css'
import '@fontsource/poppins'
import './style.css'
import LoginChat from './components/LoginChat'
import Chatbot from './components/Chatbot'

export default function Chat () {
  const [isTokenRoute, setIsTokenRoute] = useState(false)

  useEffect(() => {
    const currentPath = window.location.href
    setIsTokenRoute(currentPath.includes('token'))
  }, [])

  return (
    <div className='App'>
      {!isTokenRoute ? (<LoginChat />) : (<Chatbot />)}
    </div>
  )
}
