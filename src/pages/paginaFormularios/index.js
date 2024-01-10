import React from 'react'

import { Stack, Box, Image, Heading } from '@chakra-ui/react'

import img404 from '../../assets/404.png'
import AddCancelamentoDeProposta from './components/AddCancelamentoDeProposta'
import AddDataRetorno from './components/AddDataRetorno/index'
import AddNovoConvenio from './components/AddNovoConvenio/index'
import Loading from './components/Loading/index'
import { useGetFormularios } from './hooks/useGetFormularios'
import AddDesaverbacaoProposta from './components/AddDesaverbacaoProposta'
export default function PaginaResposta () {
  const search = window.location.search
  const params = new URLSearchParams(search)
  const codePage = params.get('idForm')

  const { isLoading: loadingPesquisa, data: formulario, isError } = useGetFormularios({
    codePage
  })

  const listaFormularios = formulario || []
  return (
    <div className='App'>
      <Stack>
        <Box w='100%' p={5} >
          {loadingPesquisa
            ? (
              <Loading />
              )
            : (
              <>
                {isError && (
                  <Box
                    display='flex'
                    justifyContent='center'
                    alignItems='center'
                    height='100vh'>
                    <Image src={img404} alt='Dan Abramov' />
                    <Heading as='h6' size='2xl' textAlign={'center'}>
                      Não foi possivél fazer essa pesquisa!
                    </Heading>
                  </Box>

                )}

                {listaFormularios?.formulario?.componente === 'addNovoConvenio' && (
                  <AddNovoConvenio formulario={listaFormularios.formulario} />
                )}

                {listaFormularios?.formulario?.componente === 'AddDataRetorno' && (
                  <AddDataRetorno formulario={listaFormularios.formulario} />
                )}

                {listaFormularios?.formulario?.componente === 'AddCancelamentoDeProposta' && (
                  <AddCancelamentoDeProposta formulario={listaFormularios.formulario} />
                )}

                {listaFormularios?.formulario?.componente === 'AddDesaverbacaoProposta' && (
                  <AddDesaverbacaoProposta formulario={listaFormularios.formulario} />
                )}

              </>
              )}
        </Box>
      </Stack>
    </div>
  )
}
