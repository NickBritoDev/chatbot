import React from 'react'
import { useSelector } from 'react-redux'

import { Box, GridItem, Grid, Card, Flex, CardHeader, Text, CardBody, Badge, Image } from '@chakra-ui/react'

import logo from '../../assets/icon.png'
import formatDataHoraChat from '../../helpers/dataHora/formatDataHoraChat'
import checkPageStatus from '../../helpers/verificaNotificacao'
import socket from '../../services/socket-config'
import BlocoInformacaoDeAtedimento from './components/BlocoInformacaoDeAtedimento'
import CaixaDeMensagem from './components/CaixaDeMensagem'
import Mensagens from './components/Mensagens'
import TrilhasAtendimento from './components/TrilhasAtendimento'
import { useAlterarStatusOnlineOffline } from './hooks/useAlterarStatusOnlineOffline'
import { useCancelarAtendimentoAutomaticamente } from './hooks/useCancelarAtendimentoAutomaticamente'

export default function PaginaPainelAtendimento () {
  const { informacao } = useSelector((state) => state.blocoInformacaoAtendimento)
  const { UseRequestuseCancelamentoDeAtendimento } = useCancelarAtendimentoAutomaticamente()
  const { UseRequestAlterarStatusOnlineOffline } = useAlterarStatusOnlineOffline()

  const search = window.location.search
  const params = new URLSearchParams(search)
  const codePage = params.get('codePage')

  React.useEffect(() => {
    const { idProtocolo, idAgente } = informacao

    if (!idProtocolo || !idAgente) return
    const roomKey = `${idProtocolo}-${idAgente}`

    const handleVisibilityChange = () => {
      if (document.hidden) {
        // A página não está visível, então ouça notificações
        if (informacao.status !== 'Fechado' && informacao.status !== 'Cancelado (Por Falta de Interação)') {
          UseRequestAlterarStatusOnlineOffline({
            online: false,
            idProtocolo
          })
        }

        socket.emit('joinRoom', roomKey)
        socket.on(`notificacao-painel-atendimento-cliente-${roomKey}`, (notification) => {
          checkPageStatus(notification.message)
        })
      } else {
        // A página está visível, então pare de ouvir notificações
        if (informacao.status !== 'Fechado' && informacao.status !== 'Cancelado (Por Falta de Interação)') {
          UseRequestAlterarStatusOnlineOffline({
            online: true,
            idProtocolo
          })
        }

        socket.emit('leaveRoom', roomKey)
        socket.off(`notificacao-painel-atendimento-cliente-${roomKey}`)
      }
    }

    // Adicionar o ouvinte de visibilidade
    document.addEventListener('visibilitychange', handleVisibilityChange)

    // Remover o ouvinte ao desmontar o componente
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [UseRequestAlterarStatusOnlineOffline, informacao])

  const [interacaoDetectada, setInteracaoDetectada] = React.useState(false)
  const [sessaoEncerrada, setSessaoEncerrada] = React.useState(false)

  const encerrarAutomaticamente = () => {
    setSessaoEncerrada(true)
    UseRequestuseCancelamentoDeAtendimento({
      codePage,
      idProtocolo: informacao.idProtocolo
    })
  }

  React.useEffect(() => {
    function detectarInteracao () {
      setInteracaoDetectada(true)
    }

    document.addEventListener('mousemove', detectarInteracao)
    document.addEventListener('click', detectarInteracao)
    document.addEventListener('keypress', detectarInteracao)
  }, [])

  React.useEffect(() => {
    if (!sessaoEncerrada && informacao.status !== 'Cancelado (Por Falta de Interação)' && informacao.status !== 'Fechado') {
      const interval = setInterval(() => {
        if (interacaoDetectada) {
          setInteracaoDetectada(false)
        } else if (informacao.status !== 'Fechado') {
          encerrarAutomaticamente()
        }
      }, 300000)

      return () => clearInterval(interval)
    }
  }, [interacaoDetectada, encerrarAutomaticamente, sessaoEncerrada, informacao.status])

  return (
    <Box bg={'gray.100'} overflow={'hidden'} overflowX={'hidden'} className='App'>
      <Text boxShadow={'2xl'} color={'white'} bg={'#229544'} p={{ base: 1, md: 2 }} borderRadius={'25px 0 25px 25px'} mt={{ base: 0.5, md: 2 }} fontSize={{ base: 14, md: 22 }}
        display={'flex'} alignItems={'center'} justifyContent={'center'} zIndex={99} pos={'fixed'} right={{ base: 0.5, md: 4 }}>
        <Image mr={2} w={{ base: '20px', md: '40px' }} src={logo} />
        Chat Mais Valor
      </Text>
      <Grid overflowX={'hidden'}
        templateAreas={`
                  "nav main"
                  "nav footer"`}
        gridTemplateRows={'663px 0px'}
        gridTemplateColumns={'255px'}
        h='100vh'
        gap='1'
        color='blackAlpha.900'
        fontWeight='bold'
      >
        <GridItem pl='2' area={'nav'}>
          <BlocoInformacaoDeAtedimento codePage={codePage} />
        </GridItem>
        <GridItem bg={'gray.100'} pl='2' area={'main'} sx={{
          height: '100vh'
        }}>
          <Card overflowX={'hidden'} boxShadow={'none'} pos={{ base: 'absolute', md: 'initial' }} left={{ base: 0 }} top={{ base: 0 }} h={{ base: '100vh', md: '90vh' }} w={'100%'} mt={{ base: 0, md: 10 }} >
            <CardHeader mb={{ base: '-50px', md: -8 }} w={'100%'}>
              <Flex spacing='4' w={'100%'}>
                <Flex flex='1' gap='4' flexWrap='wrap'>
                  <Box mt={6} mb={2} >
                    {informacao.status === 'Aguardando Atendimento' && (
                      <Text mt={-4} fontSize={{ base: 14, md: 18 }}> Por favor, em alguns segundos você será atendimento!</Text>
                    )}

                    {informacao.status === 'Em Trilha' && (
                      <Text borderBottom={{ base: 'solid 1px #ccc', md: 'none' }} pos={{ base: 'fixed', md: 'initial' }} bg={'white'} w={'100%'} left={{ base: 0, md: 0 }} top={{ base: 4, md: 0 }} pt={{ base: 10, md: 0 }} pl={4} h={{ base: 20, md: 0 }} mt={-4} fontSize={{ base: 14, md: 18 }}> Selecione uma trilha para iniciar o atendimento !</Text>
                    )}

                    {(informacao.status === 'Em Andamento' || informacao.status === 'Fechado') && (
                      <Box bg={'green.600'} pos={{ base: 'fixed', md: 'initial' }} zIndex={99} top={4} left={4} display={'flex'} alignItems={'center'} justifyContent={'space-between'} >
                        <Box mt={{ base: -4, md: -10 }} ml={-4}>
                          <Badge w={{ base: '500px', md: 'initial' }} h={'14'} p={2} colorScheme='whiteAlpha' bg={{ base: 'green.600', md: 'blue.500' }}
                            borderRadius={{ base: '0px', md: '0 10px 10px 10px' }} display={'flex'} alignItems={'center'}>
                            <Image border={'solid 1px white'} borderRadius={'50%'} boxShadow={'2xl'} p={1} mr={2} w={'40px'} src={logo} display={{ base: 'initial', md: 'none' }}/>
                            <Flex flexDir={'column'}>
                            <Text fontSize={{ base: 12, md: 14 }}>Início de Atendimento: {formatDataHoraChat(informacao.primeiraInteracaoAgente)}</Text>
                            <Text fontSize={{ base: 10, md: 12 }}> Tempo de Atendimento: {informacao.tempoDeAtendimento === '00:00:00' ? '😀 Agora' : informacao.tempoDeAtendimento}</Text>
                            </Flex>
                          </Badge>
                        </Box>

                      </Box>
                    )}

                  </Box>
                </Flex>
              </Flex>
            </CardHeader>
            <CardBody mt={6} borderTop={'1px solid #ccc'} >
              {informacao.status === 'Em Trilha'
                ? (
                  <>
                    <TrilhasAtendimento />
                  </>
                  )
                : (
                  <>
                    <Mensagens />
                  </>
                  )}
              <Box bg={'white'} justifyContent={'center'} display={'flex'} alignItems={'center'} gap={3}>
                <CaixaDeMensagem />
              </Box>
            </CardBody>
          </Card>
        </GridItem>
      </Grid>
    </Box>
  )
}
