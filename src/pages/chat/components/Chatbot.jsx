import { Box, ChakraProvider } from '@chakra-ui/react'
import React from 'react'
import LayoutChat from './LayoutChat'

export default function Chatbot () {
  return (
    <ChakraProvider>
      <Box overflow={'hidden'} h={'100vh'} w={{ base: '100%', md: '100%', lg: '650px' }}>
        <LayoutChat />
      </Box>
    </ChakraProvider>
  )
}
