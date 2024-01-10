import { Outlet } from 'react-router-dom'
import React from 'react'

import { ChakraProvider, CSSReset, theme } from '@chakra-ui/react'

export default function PainelAtendimento () {
  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <Outlet />
    </ChakraProvider>
  )
}
