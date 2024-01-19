import { Button } from '@chakra-ui/react'
import React from 'react'
import { FaRegArrowAltCircleLeft } from 'react-icons/fa'

export default function ButtonNavigate () {
  return (
    <Button onClick={() => {
      location.reload()
    }} display={'flex'} alignItems={'center'} justifyItems={'center'} gap={2} pos={'fixed'} top={2} left={2} zIndex={99999}>
      <FaRegArrowAltCircleLeft /> voltar
    </Button>
  )
}
