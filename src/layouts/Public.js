/* eslint-disable react/prop-types */

import { Outlet } from 'react-router-dom'
import React from 'react'

import { Flex, useColorModeValue, ChakraProvider, CSSReset, theme } from '@chakra-ui/react'

export default function AppLayout ({ children }) {
  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.200', 'gray.800')}>

        <Outlet />
      </Flex>

    </ChakraProvider>
  )
}
