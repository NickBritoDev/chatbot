/* eslint-disable camelcase */
import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import { Search2Icon } from '@chakra-ui/icons'
import { Box, Text, Flex, Heading, Spinner, Icon, Input, SkeletonCircle, Button } from '@chakra-ui/react'

import MensagemEntrada from './MensagemEntrada'
import MensagemSaida from './MensagemSaida'
import { useGetMensagensAtendimento } from '../hooks/useGetMensagensAtendimento'
import DialogEncerrarAtendimento from './DialogEncerrarAtendimento'
import SkeletonMessagensChat from './SkeletonMensagensChat'

export default function Mensagens () {
  const [, setloadScroll] = React.useState(false)
  const baseScroll = React.useRef(null)
  const { informacao } = useSelector((state) => state.blocoInformacaoAtendimento)
  const [inputPwa, setInputPwa] = useState(false)

  const { data, isLoading: isLoadingDadosMensagens, isError } = useGetMensagensAtendimento({
    idProtocolo: informacao.idProtocolo
  })

  const [searchTerm, setSearchTerm] = useState('')

  const mensagens = data || []

  const handleChange = (event) => {
    setSearchTerm(event.target.value)
  }

  const filteredElements = mensagens.filter((element) =>
    element.mensagem.toLowerCase().includes(searchTerm.toLowerCase())
  )

  function handleMouseLeave () {
    setloadScroll(false)
  }

  React.useEffect(() => {
    setloadScroll(true)
  }, [data])

  return (
    <>

      <Flex w={'100%'} rounded={'2xl'} onMouseLeave={handleMouseLeave} ref={baseScroll} height={{ base: '78.5vh', md: 400 }} overflowY={'scroll'} overflowX={'hidden'} p='2' pb={'40px'}>
        {!isError
          ? (
            <>
              {!isLoadingDadosMensagens
                ? (
                  <>
                    {informacao.status === 'Aguardando Atendimento' && (
                      <>
                        <Flex w={{ base: '', md: '80%' }} m={' 0 auto 0 auto'} justifyContent={'center'} alignItems={'center'} ml={{ base: -4, md: '2%' }}>
                          <Box w={{ base: '90vw', md: '' }} display={'flex'} flexDir={'column'} alignContent={'center'} justifyContent={'center'} alignItems={'center'} textAlign='center' py={10} px={6}>
                            <Heading as='h2' size={{ base: 'md', md: 'xl' }} mt={6} mb={2}>
                              Nº de Protocolo do Atendimento: {informacao.idProtocolo}
                            </Heading>
                            <Spinner
                              thickness='4px'
                              speed='0.65s'
                              emptyColor='gray.200'
                              color='green'
                              size='xl'
                            />
                            <Text color={'gray.500'}>
                              Muitos atendimentos ao cliente são resolvidos por meio de orientação, da instrução amigável, simples e de fácil execução. Em breve você sera atendido.
                            </Text>
                          </Box>
                        </Flex>
                      </>
                    )}
                    {informacao.status !== 'Aguardando Atendimento' && (
                      <>
                        <Button w={'10px'} h={'35px'} zIndex={99}
                          borderRadius={'10px 0 10px 10px'}
                          boxShadow={'md'}
                          top={'12'} mt={{ base: 0, md: 1 }}
                          pos={'fixed'} right={1} display={{ base: 'flex', md: 'none' }}
                          ref={baseScroll}
                          onClick={() => {
                            setInputPwa(!inputPwa)
                            setSearchTerm('')
                          }}
                        >
                          <Icon as={Search2Icon} fontSize={20} />
                        </Button>
                        <DialogEncerrarAtendimento />
                        <Box
                          boxShadow={'lg'}
                          w={{ base: '100%', md: '350px' }}
                          zIndex={9}
                          rounded={{ base: 'lg', md: '2xl' }} p={2}
                          bg={'gray.200'} top={{ base: '20', md: '16' }} mt={{ base: -7, md: 1 }}
                          pos={'fixed'} right={{ base: 0, md: 4 }} display={inputPwa ? { base: 'flex', md: 'flex' } : { base: 'none', md: 'flex' }}
                          ref={baseScroll}
                          alignContent={'center'} alignItems={'center'} justifyContent={'center'}>
                          <Icon display={{ base: 'none', md: 'initial' }} as={Search2Icon} fontSize={20} mr={4} />
                          <Input
                            onChange={handleChange}
                            value={searchTerm}
                            placeholder='Buscar Mensagens...'
                            variant='unstyled' />
                        </Box>
                      </>
                    )}
                    <Box ref={baseScroll} w={{ base: '100%', md: '90%' }} gap={2} mb={2} mt={2} display={'flex'} flexDirection={'column'}>

                      {isLoadingDadosMensagens
                        ? (
                          <>
                            <SkeletonMessagensChat />
                          </>
                          )
                        : (
                          <>
                            {filteredElements.map(({
                              direcao,
                              autor,
                              mensagem,
                              data,
                              mimetype,
                              originalname,
                              foto,
                              mensagemRespondida_originalname,
                              mensagensRespondida_direcao,
                              mensagemRespondida_mimetype,
                              mensagemRespondida
                            }) => (
                              <>
                                {direcao === 'out' && (
                                  <Box mt={2} >
                                    <MensagemEntrada searchTerm={searchTerm} autor={autor} data={data} mensagem={mensagem} mimetype={mimetype} originalname={originalname} foto={foto} mensagemRespondida_originalname={mensagemRespondida_originalname} mensagensRespondida_direcao={mensagensRespondida_direcao} mensagemRespondida_mimetype={mensagemRespondida_mimetype} mensagemRespondida={mensagemRespondida} />
                                  </Box>
                                )}
                                {direcao === 'in' && (
                                  <Box >
                                    <MensagemSaida searchTerm={searchTerm} autor={autor} data={data} mensagem={mensagem} mimetype={mimetype} originalname={originalname} foto={foto} mensagemRespondida_originalname={mensagemRespondida_originalname} mensagensRespondida_direcao={mensagensRespondida_direcao} mensagemRespondida_mimetype={mensagemRespondida_mimetype} mensagemRespondida={mensagemRespondida} />
                                  </Box >
                                )}
                              </>
                            ))}
                          </>
                          )}

                    </Box>
                  </>
                  )
                : (
                  <>
                    <Box padding='1' w={'50%'}>
                      <SkeletonCircle size='10' mb={2} />
                      <Text fontSize={12} fontWeight={'hairline'} color={'teal'}>Carregando</Text>
                    </Box>
                  </>
                  )}
            </>
            )
          : (
              null
            )}
      </Flex>
    </>
  )
}
