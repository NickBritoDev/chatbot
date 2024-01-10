import { Box, Button, ChakraProvider, Input, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useGetInicializacao } from '../hooks/useGetInicializacao'
import '../animations/formButtonsChat.css'
import '../animations/balonsChat.css'
import { useMutation } from 'react-query'
import api from '../../../services/api'
import { IoMdSend } from 'react-icons/io'

// isLoading: isLoadingDadosInicializacao
export default function InteracaoChat () {
  const [formDepartamento, setFormDepartamentos] = useState(true)
  const [formMenu, setFormMenu] = useState(false)
  const [visibilidadeInput, setVisibilidadeInput] = useState(false)
  const [visibilidadeFiltroPesquisa, setVisibilidadeFiltroPesquisa] = useState(false)
  const [departamento, setDepartamentos] = useState('')
  const [menu, setMenu] = useState('')
  const [menuID, setMenuID] = useState('')
  const [valueInput, setValueInput] = useState('')
  const [, setElementosTags] = useState([])
  const [elementosTagsFinal, setElementosTagsFinal] = useState([])
  const [, setLinkResposta] = useState(null)
  const [messagemBot, setMensagemBot] = useState(null)
  const [menssagemBotMenu, setMenssagemBotMenu] = useState(null)
  const [mensagemLinkBot, setMensagemLinkBot] = useState(null)
  const [listapreTags, setListaPreTags] = useState([])
  const { data: dadosIniciais } = useGetInicializacao()
  const chatDadosIniciais = dadosIniciais || {}

  const selecionarDepatamento = useMutation(async (payload) => {
    const idDepartamento = {
      idDepartamento: payload.idDepartamento.value
    }

    setDepartamentos(payload.idDepartamento.label)
    setFormMenu(true)

    const response = await api.post('/v1/api/chat/selecionandoDepartamento', idDepartamento)
    return response.data
  }, {
    onSuccess: (data) => {
      const { mensagem, menuOpcoes, linkApiResposta } = data
      setMensagemBot(mensagem)
      setElementosTags(menuOpcoes)
      setListaPreTags(menuOpcoes)
      setLinkResposta(linkApiResposta)
      setFormDepartamentos(false)
    }
  })

  const selecionandoMenu = useMutation(async (payload) => {
    const response = await api.post('/v1/api/chat/selecionandoMenu', payload)
    return response.data
  }, {
    onSuccess: (data) => {
      const { mostrarInput, mensagem } = data

      if (mostrarInput) {
        setVisibilidadeInput(true)
        setMenssagemBotMenu(mensagem)
      }
    }
  })

  const selecionandoTags = useMutation(async (payload) => {
    const response = await api.post('/v1/api/chat/selecionandoTags', payload)
    return response.data
  }, {
    onSuccess: (data) => {
      const { mensagem, respostas } = data
      let resposta = ''
      respostas.forEach((msg) => {
        resposta += `${msg}\n`
      })

      setMensagemLinkBot({
        title: `${mensagem} \n\n`,
        link: resposta.replace('chatbot', 'chatbotapp')
      })

      setElementosTagsFinal([{
        value: 'reset',
        label: '#VOLTARMENUINICIAL'
      },
      {
        value: 'falarComAtendente',
        label: '#FALARCOMATENDENTE'
      }])
    }
  })

  const clickDepartamento = (value) => {
    if (chatDadosIniciais.linkApiResposta === 'selecionandoDepartamento') {
      selecionarDepatamento.mutate({
        idDepartamento: value
      })
    }
  }

  const clickMenu = (value) => {
    if (value.value === 'reset') {
      setFormDepartamentos(true)
      setFormMenu(false)
      return
    }

    selecionandoMenu.mutate({
      idMenu: value.value
    })
    setMenu(value.label)
    setMenuID(value.value)
    setFormDepartamentos(false)
    setFormMenu(false)
  }

  const valorInput = () => {
    selecionandoTags.mutate({
      idPretag: menuID,
      filtroPesquisa: valueInput
    })
    setVisibilidadeFiltroPesquisa(true)
    setVisibilidadeInput(false)
  }

  const tagsPrincipais = (value) => {
    if (value.value === 'reset') {
      setFormDepartamentos(true)
      setFormMenu(false)
      setElementosTagsFinal([])
      return
    }

    if (value.value === 'falarComAtendente') {
      selecionandoTags.mutate({
        idPretag: value.value
      })
      setFormDepartamentos(true)
      setFormMenu(false)
      setElementosTagsFinal([])
    }
  }

  useEffect(() => {
    if (mensagemLinkBot !== null && typeof mensagemLinkBot.link === 'string' && mensagemLinkBot.link.startsWith('https://')) {
      window.location.href = mensagemLinkBot.link
    }
  }, [mensagemLinkBot])

  return (
    <ChakraProvider>
      <Box mt={20} p={2}>
        <Box className='slide-right' fontSize={16} color={'white'} bg={'blue.500'} p={2} borderRadius={'0 12px 12px 12px'} w={{ base: '80%', md: 'max-content' }}>
          {chatDadosIniciais.mensagem}
        </Box>

        {departamento !== '' &&
          <Box mt={2} textAlign={'right'} pos={'relative'} right={{ base: '-80%', md: '-93%' }} fontSize={16} color={'white'} bg={'green.500'} p={2} borderRadius={'12px 0 12px 12px'} w={{ base: '18%', md: 'max-content' }}>
            {departamento}
          </Box>
        }

        {messagemBot !== null &&
          <Box className='slide-right' fontSize={16} color={'white'} bg={'blue.500'} p={2} borderRadius={'0 12px 12px 12px'} w={{ base: '80%', md: 'max-content' }}>
            {messagemBot}
          </Box>
        }

        {menu !== '' &&
          <Box mt={2} textAlign={'right'} pos={'relative'} right={{ base: '-29%', md: '-64%' }} fontSize={16} color={'white'} bg={'green.500'} p={2} borderRadius={'12px 0 12px 12px'} w={{ base: '70%', md: 'max-content' }}>
            {menu}
          </Box>
        }

        {menssagemBotMenu !== null &&
          <Box mt={2} className='slide-right' fontSize={16} color={'white'} bg={'blue.500'} p={2} borderRadius={'0 12px 12px 12px'} w={{ base: '80%', md: 'max-content' }}>
            {menssagemBotMenu}
          </Box>
        }

        {valueInput !== '' && visibilidadeFiltroPesquisa &&
          <Box mt={2} textAlign={'right'} pos={'relative'} right={{ base: '-59%', md: '-89%' }} fontSize={16} color={'white'} bg={'green.500'} p={2} borderRadius={'12px 0 12px 12px'} w={{ base: '40%', md: 'max-content' }}>
            {valueInput}
          </Box>
        }

        {mensagemLinkBot !== null &&
          <Box mt={2} className='slide-right' fontSize={16} color={'white'} bg={'blue.500'} p={2} borderRadius={'0 12px 12px 12px'} w={{ base: '80%', md: 'max-content' }}>
            {mensagemLinkBot.title}
            <br />
            <br />
            <br />
            <a href={mensagemLinkBot.link} onClick={(e) => { e.preventDefault() }}>{mensagemLinkBot.link}</a>
          </Box>
        }

        <VStack display={!formDepartamento ? 'none' : 'initial'} className='slide-top' borderRadius={'25px 25px 0 0'} boxShadow={'0px -4px 6px rgba(0, 0, 0, 0.2)'} pt={4} px={6} zIndex={999} pos={'fixed'} bottom={0} pb={10} left={0} bg={'white'} w={'100%'} >
          {chatDadosIniciais?.dadosInicializacao && chatDadosIniciais.dadosInicializacao.map((buttons, index) => (
            <Button mt={1} _hover={{ bg: 'green', color: 'white' }} rounded={'2xl'} key={index} w={'100%'}
              onClick={() => { clickDepartamento(buttons) }} value={buttons.value} >
              {buttons.label}
            </Button>
          ))}
        </VStack>

        {formMenu &&
          <VStack overflowY={'scroll'} display={!formMenu ? 'none' : 'initial'} className='slide-top' borderRadius={'25px 25px 0 0'} boxShadow={'0px -4px 6px rgba(0, 0, 0, 0.2)'} pt={4} px={6} zIndex={999} pos={'fixed'} bottom={0} pb={6} left={0} bg={'white'} maxH={'80vh'} w={'100%'} >
            {listapreTags && listapreTags.map((buttons, index) => (
              <Button overflowWrap="break-word" whiteSpace={'wrap'} mt={1} _hover={{ bg: 'green', color: 'white' }} rounded={'2xl'} key={index} w={'100%'}
                value={buttons.value} onClick={() => { clickMenu(buttons) }}>
                {buttons.label}
              </Button>
            ))}
          </VStack>
        }

        <VStack display={elementosTagsFinal.length > 0 ? 'initial' : 'none'} className='slide-top' borderRadius={'25px 25px 0 0'} boxShadow={'0px -4px 6px rgba(0, 0, 0, 0.2)'} pt={4} px={6} zIndex={999} pos={'fixed'} bottom={0} pb={10} left={0} bg={'white'} w={'100%'} >
          {elementosTagsFinal && elementosTagsFinal.map((buttons, index) => (
            <Button mt={1} _hover={{ bg: 'green', color: 'white' }} rounded={'2xl'} key={index} w={'100%'}
              onClick={() => { tagsPrincipais(buttons) }} value={buttons.value} >
              {buttons.label}
            </Button>
          ))}
        </VStack>

        {visibilidadeInput &&
          <Box gap={2} display={'flex'} alignItems={'center'} justifyContent={'center'} ml={-2} w={'100%'} borderRadius={'25px 25px 0 0'} p={4} bg={'gray.600'} pos={'absolute'} bottom={'-2'} >
            <Input bg={'white'} rounded={'2xl'} mt={-1}
              onChange={(e) => setValueInput(e.target.value)}
              value={valueInput}
              placeholder='Digite... ' />
            <Button _hover={{ bg: 'transparent' }} bg={'transparent'} mt={-1} rounded={'lg'} onClick={valorInput}>
              <IoMdSend color='white' fontSize={30}/>
            </Button>
          </Box>
        }

      </Box>
    </ChakraProvider>
  )
}
