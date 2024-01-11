import { Button } from '@chakra-ui/react'
import React from 'react'

export default function DialogEncerrarAtendimento () {
  const removeChaves = () => {
    localStorage.removeItem('codePage')
    location.reload()
  }

  return (
    <Button
      display={{ base: 'flex', md: 'none' }}
      borderRadius={'10px 0 10px 10px'}
      boxShadow={'md'}
      w={'10px'} h={'35px'}
      pos={'absolute'}
      right={1} top={1}
      fontWeight={'bold'}
      zIndex={999} onClick={removeChaves}>
      X
    </Button>
  )
}
