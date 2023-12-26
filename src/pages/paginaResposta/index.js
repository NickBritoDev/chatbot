import React from 'react'

import { Stack, Box, Alert, AlertIcon } from '@chakra-ui/react'

import InformacaoResposta from './components/InformacaoResposta'
import Loading from './components/Loading'
import { useGetPesquisas } from './hooks/useGetPesquisas'
export default function PaginaResposta () {
  const search = window.location.search
  const params = new URLSearchParams(search)
  const codePage = params.get('codePage')

  const { isLoading: loadingPesquisa, data: pesquisa, isError } = useGetPesquisas({
    codePage
  })
  const listaPesquisa = pesquisa || []
  return (
    <div className='App'>
      <Stack>
        <Box w='100%' p={5} >
          {loadingPesquisa
            ? (
            <Loading/>
              )
            : (
            <>
              {isError
                ? (
                <Alert status='error'>
                  <AlertIcon />
                  Desculpe!Ocorreu algum erro, tente novamente, mais tarde!
                </Alert>
                  )
                : (
                <InformacaoResposta resposta={listaPesquisa.resposta} pergunta={listaPesquisa.pergunta}/>
                  )}
            </>
              )}
        </Box>
      </Stack>
    </div>
  )
}
