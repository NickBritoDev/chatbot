import React from 'react'

import { Box, Text, Image } from '@chakra-ui/react'

import imageNotAcess from '../../../assets/401.png'

export default function PAGE401 () {
  return (
    <>
      <Box mt={2} display='flex' flexDirection={'column'} alignItems={'center'} justifyContent={'space-between'}>
        <Image height={'300px'} src={imageNotAcess} mb={4} w={'95%'}/>
        <Text margin={'0 auto'} textAlign={'center'} fontSize={'44px'}>
          🚷
        </Text>
        <Text margin={'10px auto'} textAlign={'center'} color={'black'} fontWeight={'bold'} textTransform={'uppercase'}>
          401 - Acesso negado
        </Text>
        <Text fontWeight={'semibold'} margin={'10px auto'} textAlign={'center'} color={'gray'}>
          Você não tem permissão para acessar esse recurso.
        </Text>
      </Box>
    </>
  )
}
