import React from 'react'
import { FaSun, FaMoon } from 'react-icons/fa'

import { IconButton, useColorMode } from '@chakra-ui/react'

export default function ToggleMode () {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <IconButton
      mb={2}
      mr={2}
      onClick={toggleColorMode}
      icon={colorMode === 'light' ? <FaSun color={'#000'} /> : <FaMoon color={'#000'} />}
      alignSelf={'flex-end'}
      size={'lg'}
    />
  )
}
