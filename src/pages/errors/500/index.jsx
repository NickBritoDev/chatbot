import React from 'react'

import { Box, Text, Image } from '@chakra-ui/react'

import imageServerError from '../../../assets/500.png'

export default function PAGE500 () {
  return (
    <>
      <Box fontWeight={'semibold'} fontSize={'18px'} display='flex' flexDirection={'column'} alignItems={'center'} justifyContent={'space-between'}>
        <Image height={'300px'} src={imageServerError} mb={4}/>
        <Text textAlign={'center'} color={'black'} mb={4} fontWeight={'bold'} textTransform={'uppercase'}>
          500 - Erro interno do servidor
        </Text>
        <Text textAlign={'center'} color={'gray'}>
          Pedimos perdão pelo transtorno, estamos trabalhando para resolver o problema o mais rápido possível.
        </Text>
        <Text mb={10} textAlign={'center'} color={'gray'}>
          Tente novamente em alguns minutos.
        </Text>
      </Box>
    </>
  )
}
