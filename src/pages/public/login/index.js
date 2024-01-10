import React from 'react'
import { Navigate } from 'react-router-dom'

import { WarningTwoIcon } from '@chakra-ui/icons'
import { Stack, Heading, Spinner, Box, Flex, Text } from '@chakra-ui/react'

import { useGetAuth } from './hooks/useGetAuth'

export default function Login () {
  const search = window.location.search
  const params = new URLSearchParams(search)
  const h = params.get('h')
  const [fromHomeAdmin, SetFromHomeAdmin] = React.useState(false)

  const { data: dadosAuth, isLoading, isError } = useGetAuth({
    h
  })
  const listaDadosAuth = dadosAuth || []

  React.useEffect(() => {
    if (listaDadosAuth.token) {
      localStorage.setItem('token', listaDadosAuth.token)

      SetFromHomeAdmin(true)
    }
  }, [listaDadosAuth])

  return (
    <>
      {isLoading && (
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Spinner
              thickness='4px'
              speed='0.65s'
              emptyColor='gray.200'
              color='green'
              size='xl'
            />
            <Heading fontSize={'2xl'}>Carregando configurações de Usuário</Heading>
          </Stack>
        </Stack>
      )}

      {isError && (
        <Box textAlign='center' py={10} px={6}>
          <Box display='inline-block'>
            <Flex
              flexDirection='column'
              justifyContent='center'
              alignItems='center'
              bg={'red.500'}
              rounded={'60px'}
              w={'70px'}
              h={'70px'}
              textAlign='center'>
              <WarningTwoIcon boxSize={'50px'} color={'orange.300'} />
            </Flex>
          </Box>
          <Heading as='h2' size='xl' mt={6} mb={2}>
            Ops! No momento sua configuração não obteve sucesso!
          </Heading>
          <Text color={'gray.500'}>
            Tente acessar novamente o Portal Mais Valor!
          </Text>
        </Box>
      )}

      {fromHomeAdmin && (
        <><Navigate to={'/admin/home'}/></>
      )}
    </>
  )
}
