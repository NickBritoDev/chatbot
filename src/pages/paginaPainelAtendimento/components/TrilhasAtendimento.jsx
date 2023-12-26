import React, { useState } from 'react'
import { IoSendSharp } from 'react-icons/io5'
import { useSelector } from 'react-redux'

import { Box, Button, Flex, Grid, Icon, Spinner, Tag, TagLabel, VStack } from '@chakra-ui/react'

import { useEnviarTrilaSelecionada } from '../hooks/useEnviarTrilaSelecionada'
import { useGetobtendoTrilha } from '../hooks/useGetObtendoTrilhas'
import DialogAbrirOutros from './DialogAbirTrilhaOutros'

export default function TrilhasAtendimento () {
  const { UseRequestuseEnvioDeTrilha, isLoading } = useEnviarTrilaSelecionada()
  const { informacao } = useSelector((state) => state.blocoInformacaoAtendimento)
  const { data } = useGetobtendoTrilha()
  const trilhas = data || []

  const [selectedTag, setSelectedTag] = useState(null)
  const [showAlert, setShowAlert] = useState(false)

  const handleTagClick = (trilha) => {
    if (!trilha.id) {
      setShowAlert(true)
      setSelectedTag(trilha.id)
      return
    }

    setSelectedTag(trilha.id)
    setShowAlert(false)
  }

  const enviarTrilhaSelecionada = () => {
    UseRequestuseEnvioDeTrilha(
      {
        idTrilha: selectedTag,
        codePage,
        idProtocolo: informacao.idProtocolo
      }
    )
  }

  const handleTrilhaCreated = () => {
    setShowAlert(false)
  }

  const search = window.location.search
  const params = new URLSearchParams(search)
  const codePage = params.get('codePage')

  return (
    <VStack ml={-4} w={'100%'} alignItems={'left'} justifyContent={'left'}>
      <Flex mt={6} p={4} justifyContent={'center'} alignItems={'center'} w={'max-content'}>
        <Grid alignItems={'center'} justifyContent={'center'} templateColumns={{ base: 'repeat(1, 0fr)', md: 'repeat(2, 1fr)' }} mb={2} gap={{ base: 4, md: 6 }}>
          {trilhas.map((tags) => (
            <Tag
              fontSize={{ base: 12, md: 16 }}
              textTransform={'capitalize'}
              _hover={{ color: 'green' }}
              cursor={'pointer'}
              w={'max-content'}
              size={'lg'}
              key={tags.id}
              variant='outline'
              colorScheme={selectedTag === tags.id ? 'green' : 'gray'}
              onClick={() => handleTagClick(tags)}>
              <TagLabel >#{tags.nome}</TagLabel>
            </Tag>
          ))}
        </Grid>
      </Flex>
      {showAlert && <DialogAbrirOutros onClose={() => setShowAlert(false)} onTrilhaCreated={handleTrilhaCreated} />}
      {selectedTag &&
        <Box w={'100%'} bg={'white'} h={12}
          pb={1}
          position={{ base: 'fixed', md: 'initial' }}
          bottom={{ base: 0, md: 8 }}
          left={{ base: 0, md: 'initial' }}
          display={'flex'}
          alignItems={'flex-end'}
          justifyContent={'flex-end'}
          boxShadow={{ base: '0px -4px 6px rgba(0, 0, 0, 0.2)', md: 'none' }}
        >
          <Button
            position={{ base: 'initial', md: 'fixed' }}
            bottom={{ base: 0, md: 8 }}
            right={{ base: 0, md: 2 }}
            onClick={() => enviarTrilhaSelecionada()}
            _hover={{
              bg: '#229544'
            }}
            fontSize={{ base: 16, md: 18 }}
            gap={2}
            justifyContent={'space-around'}
            alignItems={'center'}
            display={'flex'}
            textTransform={'uppercase'}
            w={{ base: '120px', md: '200px' }}
            color={'white'}
            bg={'green'}
            mr={4}
          >
            {!isLoading ? 'Enviar' : 'Enviando'}
            {isLoading ? <Spinner /> : <Icon mr={-4} fontSize={24} as={IoSendSharp} />}
          </Button>
        </Box>
      }
    </VStack>
  )
}
