/* eslint-disable react/prop-types */
import React from 'react'
import { useDispatch } from 'react-redux'

import { Flex, Box, Avatar, Text, CardHeader, Card, CardBody, Progress, AvatarBadge, SkeletonCircle, Badge } from '@chakra-ui/react'

import userAvatar from '../../../assets/icon.png'
import { INFORMACOES_ATENDIMENTOS } from '../../../features/blocoInformacaoAtendimento/index'
import { useGetInformacoesDeAtendimento } from '../hooks/useGetInformacoesDeAtendimento'

export default function BlocoInformacaoDeAtedimento () {
  const codePage = localStorage.getItem('codePage')
  const dispatch = useDispatch()
  const { data: dadosBlocoDeInformacao, isLoading: isLoadingDadosInicializacao, isError } = useGetInformacoesDeAtendimento({
    codePage
  })

  const listaDadosBlocoDeInformacao = dadosBlocoDeInformacao || {}

  React.useEffect(() => {
    const { idAgente, departamento, idDepartamento, idProtocolo, usuario, idUsuario, agente, status, primeiraInteracaoAgente, tempoDeAtendimento } = dadosBlocoDeInformacao?.informacao || []
    dispatch(INFORMACOES_ATENDIMENTOS({
      idAgente, departamento, idDepartamento, idProtocolo, usuario, idUsuario, agente, status, primeiraInteracaoAgente, tempoDeAtendimento
    }
    ))
  }, [dispatch, dadosBlocoDeInformacao?.informacao])

  return (
    <>
      {!isError
        ? (
          <Flex gap='4' >
            {!isLoadingDadosInicializacao
              ? (
                <Flex display={{ base: 'none', md: 'flex', sm: 'flex', lg: 'flex' }} flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                  <Card ml={-1} cursor={'not-allowed'} mt={10} w='250px' p='2' boxShadow={'2xl'}>
                    <CardHeader display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'} mb={-6}>
                      <>
                        <Avatar mb={4} border={'solid 1px #239645'} w={55} h={55} p={3} src={userAvatar} >
                          <AvatarBadge boxSize='1.25em' bg={!listaDadosBlocoDeInformacao.informacao.offline ? 'green.500' : 'red.500'} />
                        </Avatar>
                        <Box mb={10} textAlign={'center'}>
                          <Text fontSize={18}>{listaDadosBlocoDeInformacao?.informacao?.usuario.split(' ')[0] || 'Parceiro'}</Text>
                          <Text fontSize={16} mt={1}>Departamento: {listaDadosBlocoDeInformacao?.informacao?.departamento}</Text>
                          <Text fontSize={14}>Status:  {listaDadosBlocoDeInformacao?.informacao?.statusChat}</Text>
                          {listaDadosBlocoDeInformacao?.informacao?.status === 'Aguardando Atendimento'
                            ? (
                              <>
                                <Badge mt={4} colorScheme='whiteAlpha' bg={'yellow.200'} p={1}>
                                  <Text color={'black'} fontSize={14}> 💬 {listaDadosBlocoDeInformacao?.informacao?.status}</Text>
                                </Badge>
                                <Flex mt={4} mb={'24'} position={'relative'} direction={'column'} alignItems={'left'} justifyContent={'left'}>
                                  <Text left={2} top={1} position={'absolute'}>Pré Atendimento: </Text>
                                  <Text fontSize={14} left={-1} p={1} textTransform={'capitalize'}
                                    borderRadius={'6px'} border={'1px solid #ccc'} top={8} position={'absolute'}>{listaDadosBlocoDeInformacao?.informacao?.trilha}</Text>
                                </Flex>
                              </>
                              )
                            : listaDadosBlocoDeInformacao?.informacao?.status === 'Fechado'
                              ? (
                                <Badge mt={4} colorScheme='whiteAlpha' bg={'gray.100'} p={1}>
                                  <Text color={'black'} fontSize={14}> 💬 {listaDadosBlocoDeInformacao?.informacao?.status}</Text>
                                </Badge>
                                )
                              : listaDadosBlocoDeInformacao?.informacao?.status === 'Em Trilha'
                                ? (
                                  <Badge mt={4} colorScheme='whiteAlpha' bg={'gray.100'} p={1}>
                                    <Text color={'black'} fontSize={14}> 💬 Aguardando Seleção</Text>
                                  </Badge>
                                  )
                                : listaDadosBlocoDeInformacao?.informacao?.status === 'Em Andamento'
                                  ? (
                                    <Badge mt={4} colorScheme='whiteAlpha' bg={'#239645'} p={1}>
                                      <Text fontSize={14}> 💬 {listaDadosBlocoDeInformacao?.informacao?.status}</Text>
                                    </Badge>
                                    )
                                  : null}

                        </Box>
                      </>
                    </CardHeader>
                    <CardBody w={'100%'} textAlign={'center'} border={'1px'} borderColor='#239645' mt={5} borderRadius={10}>
                      {listaDadosBlocoDeInformacao?.informacao?.status === 'Em Andamento' || listaDadosBlocoDeInformacao?.informacao?.status === 'Fechado'
                        ? (
                          <>
                            <Text m={'0 auto'} fontSize={14}></Text>
                          </>
                          )
                        : listaDadosBlocoDeInformacao?.informacao?.status === 'Em Trilha'
                          ? (
                            <>
                              <Text m={'0 auto'} fontSize={14}>
                                Por favor, selecione uma tag de pré aténdimento para entrar na fila de atendimento.
                              </Text>
                            </>
                            )
                          : listaDadosBlocoDeInformacao?.informacao?.status === 'Aguardando Atendimento'
                            ? (
                              <>
                                <Text m={'0 auto'} fontSize={14}>
                                  Por favor, aguarde você está na posição ({listaDadosBlocoDeInformacao?.minhaPosicaoFila}) da fila.
                                </Text>
                              </>
                              )
                            : null}

                      {listaDadosBlocoDeInformacao?.informacao?.status === 'Aguardando Atendimento'
                        ? (
                          <Text mt={'2'} fontSize={14} fontWeight={'bold'}>
                            Pessoas na Fila no momento ({listaDadosBlocoDeInformacao?.quatidadeFila})
                          </Text>
                          )
                        : listaDadosBlocoDeInformacao?.informacao?.status === 'Fechado'
                          ? (
                            <Text mt={'2'} fontSize={14} fontWeight={'bold'}>
                              Seu atendimento foi fechado pelo agente:
                            </Text>
                            )
                          : listaDadosBlocoDeInformacao?.informacao?.status === 'Em Andamento'
                            ? (
                              <Text mt={'2'} fontSize={14} fontWeight={'bold'}>
                                Você esta em atendimento no momento com:
                              </Text>
                              )
                            : null}

                      {listaDadosBlocoDeInformacao?.informacao?.status === 'Em Trilha'
                        ? (
                          <></>
                          )
                        : (
                          <Badge mt={4} p={1} colorScheme='whiteAlpha' bg={'#239645'}>
                            <Text fontSize={12}> Agente: {listaDadosBlocoDeInformacao?.informacao?.agente.split(' ')[0]}</Text>
                          </Badge>
                          )}
                    </CardBody>
                    {listaDadosBlocoDeInformacao?.informacao?.status === 'Aguardando Atendimento' && (
                      <Progress colorScheme={'whatsapp'} mt={2} size='xs' isIndeterminate />
                    )}
                  </Card>
                </Flex>
                )
              : (
                <>
                  <Box padding='1' w={180}>
                    <SkeletonCircle size='10' mb={2} />
                  </Box>
                </>
                )}
          </Flex>
          )
        : (
            null)}
    </>
  )
}
