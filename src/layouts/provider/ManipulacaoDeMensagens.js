import React, { createContext, useContext, useState, useEffect } from 'react'

import PropTypes from 'prop-types'

const ManipulacaoDeMensagensContext = createContext()

export const ManipulacaoDeMensagensProvider = ({ children }) => {
  const savedValue = localStorage.getItem('menuItem')
  const [handleMenuItem, setHandleMenuItem] = useState(false)

  useEffect(() => {
    setHandleMenuItem(false)
  }, [savedValue])

  useEffect(() => {
    localStorage.setItem('menuItem', handleMenuItem)
  }, [handleMenuItem])

  return (
    <ManipulacaoDeMensagensContext.Provider value={{ handleMenuItem, setHandleMenuItem }}>
      {children}
    </ManipulacaoDeMensagensContext.Provider>
  )
}

export const useManipulacaoDeMensagem = () => {
  return useContext(ManipulacaoDeMensagensContext)
}

ManipulacaoDeMensagensProvider.propTypes = {
  children: PropTypes.bool.isRequired
}
