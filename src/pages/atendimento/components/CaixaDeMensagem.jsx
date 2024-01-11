import React, { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { useSelector } from 'react-redux'

import { Input, Progress, Box, Button } from '@chakra-ui/react'

import api from '../../../services/api'
import UploadArquivos from './UploadDeArquivos'
import { IoMdSend } from 'react-icons/io'

export default function CaixaDeMensagem () {
  const queryClient = useQueryClient()
  const [mensagem, SetMensagens] = useState('')
  const { informacao } = useSelector((state) => state.blocoInformacaoAtendimento)

  const handlerEnviandoMensagens = useMutation(async () => {
    const response = await api.post('/v1/api/public/inserirMensagem', {
      mensagem,
      direcao: 'in',
      idProtocolo: informacao.idProtocolo
    })
    return response.data
  }, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(['chat_useGetMensagensAtendimento', { idProtocolo: informacao.idProtocolo }])
      SetMensagens('')
    }

  })

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      if (mensagem !== '' || mensagem !== null) { handlerEnviandoMensagens.mutate() }
    }
  }

  const handleSendMsgButton = () => {
    if (mensagem !== '' || mensagem !== null) { handlerEnviandoMensagens.mutate() }
  }

  return (
    <>
      <Box overflowX={'hidden'} pos={{ base: 'fixed', md: 'initial' }} bottom={{ base: 1 }} right={{ base: 0 }} mt={'4'} w={'100%'}>
        {informacao.status === 'Em Andamento' && (
          <>
            <Box
              overflowX={'hidden'}
              boxShadow={{ base: '0px -4px 6px rgba(0, 0, 0, 0.2)', md: 'none' }}
              display={'flex'}
              alignItems={'center'}
              justifyContent={'center'}
              gap={4}
            >
              <UploadArquivos />
              <Input
                mr={2}
                fontWeight={'bold'}
                variant='unstyled'
                height={'50px'}
                paddingInline={'10px'}
                rounded={{ base: 'md', md: '2xl' }}
                bg={'gray.300'}
                color={'black'}
                value={mensagem}
                mt={2}
                onChange={(e) => { SetMensagens(e.target.value) }}
                onKeyDown={handleKeyPress}
                p='2'
                size='sm'
              />
              <Button bg={'green.600'} color={'white'} mb={-2} ml={-4} mr={1} display={{ base: 'flex', md: 'none' }} onClick={() => { handleSendMsgButton() }}> <IoMdSend fontSize={30}/></Button>
            </Box>
          </>
        )}

        {handlerEnviandoMensagens.isLoading && (
          <Progress colorScheme={'whatsapp'} mt={2} size='xs' isIndeterminate />
        )}
      </Box>
    </>
  )
}
