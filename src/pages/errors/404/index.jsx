import React from 'react'
import { useNavigate } from 'react-router-dom'

import { WarningIcon } from '@chakra-ui/icons'
import { Box, Text, Button, Image } from '@chakra-ui/react'

import imageNotFound from '../../../assets/404.png'

export default function PAGE404 () {
  const navigate = useNavigate()
  return (
    <>
      <Box mt={2} display='flex' flexDirection={'column'} alignItems={'center'} justifyContent={'space-between'}>
        <Image height={'300px'} src={imageNotFound} mb={4} w={'95%'}/>
        <WarningIcon boxSize={'50px'} color={'orange'} />
        <Text margin={'10px auto'} textAlign={'center'} color={'black'} fontWeight={'bold'} textTransform={'uppercase'}>
          404 - Página não encontrada
        </Text>
        <Text margin={'10px auto'} textAlign={'center'} color={'gray'}>
          Esse link não existe ou foi removido. <br /> Por favor, verifique se o endereço está correto.
        </Text>
        <Button size={'lg'} width='95%' color={'white'} bg={'green.400'} onClick={() => navigate(-1)}
          _hover={{
            bg: 'white',
            color: 'green.400',
            border: '1px solid green.400'
          }} >
          Voltar
        </Button>
      </Box>
    </>
  )
}
