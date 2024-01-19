import { Box, Button, ChakraProvider, Flex, Input, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useGetInicializacao } from '../hooks/useGetInicializacao'
import '../animations/formButtonsChat.css'
import '../animations/balonsChat.css'
import { useMutation } from 'react-query'
import api from '../../../services/api'
import { IoMdSend } from 'react-icons/io'
import AddNovoConvenio from '../../paginaFormularios/components/AddNovoConvenio/index'
import AddCancelamentoDeProposta from '../../paginaFormularios/components/AddCancelamentoDeProposta/index'
import AddDesaverbacaoProposta from '../../paginaFormularios/components/AddDesaverbacaoProposta/index'
import AddDataRetorno from '../../paginaFormularios/components/AddDataRetorno/index'
import { FaRegArrowAltCircleLeft } from 'react-icons/fa'

// isLoading: isLoadingDadosInicializacao
export default function InteracaoChat () {
  const [formDepartamento, setFormDepartamentos] = useState(true)
  const [formMenu, setFormMenu] = useState(false)
  const [visibilidadeInput, setVisibilidadeInput] = useState(false)
  const [visibilidadeFiltroPesquisa, setVisibilidadeFiltroPesquisa] = useState(false)
  const [departamento, setDepartamentos] = useState('')
  const [menu, setMenu] = useState('')
  const [tagID, setTagID] = useState('')
  const [valueInput, setValueInput] = useState('')
  const [, setElementosTags] = useState([])
  const [elementosTagsFinal, setElementosTagsFinal] = useState([])
  const [, setLinkResposta] = useState(null)
  const [messagemBot, setMensagemBot] = useState(null)
  const [menssagemBotMenu, setMenssagemBotMenu] = useState(null)
  const [mensagemLinkBot, setMensagemLinkBot] = useState(null)
  const [listapreTags, setListaPreTags] = useState([])
  const [listaMenus, setListaMenus] = useState([])
  const [visibilidadeListaMenus, setVisibilidadeListaMenus] = useState(false)
  const { data: dadosIniciais } = useGetInicializacao()
  const chatDadosIniciais = dadosIniciais || {}
  const [mostrarComponente, setMostrarComponente] = useState('')
  const [codePage, setCodePage] = useState('')

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
      const { mostrarInput, mensagem, preTagsMenus } = data
      if (preTagsMenus.length > 2) {
        setVisibilidadeListaMenus(true)
        setListaMenus(preTagsMenus)
      }
      if (mostrarInput) {
        setTagID(preTagsMenus[0].value)
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
    setFormDepartamentos(false)
    setFormMenu(false)
  }

  const valorInput = () => {
    selecionandoTags.mutate({
      idPretag: tagID,
      filtroPesquisa: valueInput
    })
    setVisibilidadeFiltroPesquisa(true)
    setVisibilidadeInput(false)
  }

  const tagsPrincipais = (value) => {
    if (value.value === 'reset' || value.value === 'back') {
      setVisibilidadeListaMenus(false)
      setFormDepartamentos(true)
      setFormMenu(false)
      setElementosTagsFinal([])
      setDepartamentos('')
      setMensagemBot(null)
      setMenu('')
      setValueInput('')
      setMenssagemBotMenu(null)
      setMensagemLinkBot(null)
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

    selecionandoTags.mutate({
      idPretag: value.value
    })
    setVisibilidadeListaMenus(false)
  }

  useEffect(() => {
    if (mensagemLinkBot?.title.toLowerCase().includes('clique no link para adicionar novo convênio')) {
      const url = mensagemLinkBot?.link
      const urlParams = new URLSearchParams(new URL(url).search)
      const idFormParam = urlParams.get('idForm')
      setCodePage(idFormParam)

      setMostrarComponente('clique no link para adicionar novo convênio')
    } else if (mensagemLinkBot?.title.toLowerCase().includes('cancelamento')) {
      const url = mensagemLinkBot?.link
      const urlParams = new URLSearchParams(new URL(url).search)
      const idFormParam = urlParams.get('idForm')
      setCodePage(idFormParam)
      setMostrarComponente('cancelamento')
      setCodePage(idFormParam)
    } else if (mensagemLinkBot?.title.toLowerCase().includes('desaverbar')) {
      const url = mensagemLinkBot?.link
      const urlParams = new URLSearchParams(new URL(url).search)
      const idFormParam = urlParams.get('idForm')
      setCodePage(idFormParam)
      setMostrarComponente('desaverbar')
      setCodePage(idFormParam)
    } else if (mensagemLinkBot?.title.toLowerCase().includes('retorno')) {
      const url = mensagemLinkBot?.link
      const urlParams = new URLSearchParams(new URL(url).search)
      const idFormParam = urlParams.get('idForm')
      setCodePage(idFormParam)
      setMostrarComponente('retorno')
      setCodePage(idFormParam)
    } else {
      setMostrarComponente('')
    }
  }, [mensagemLinkBot])

  useEffect(() => {
    if (mensagemLinkBot !== null && typeof mensagemLinkBot.link === 'string' && (Boolean(mensagemLinkBot.link.startsWith('https://')))) {
      const url = mensagemLinkBot?.link
      const urlParams = new URLSearchParams(new URL(url).search)
      const codePage = urlParams.get('codePage')

      if (codePage != null) {
        localStorage.setItem('codePage', codePage)
        setTimeout(() => {
          location.reload()
        }, 1000)
      }
    }
  }, [mensagemLinkBot])

  return (
    <ChakraProvider>
      {
        mostrarComponente === 'clique no link para adicionar novo convênio' && (
          <AddNovoConvenio nome={''} codpage={codePage} />
        )
      }
      {
        mostrarComponente === 'cancelamento' && (
          <AddCancelamentoDeProposta nome={''} codpage={codePage} />
        )
      }
      {
        mostrarComponente === 'desaverbar' && (
          <AddDesaverbacaoProposta nome={''} codpage={codePage} />
        )
      }
      {
        mostrarComponente === 'retorno' && (
          <AddDataRetorno nome={''} codpage={codePage} />
        )
      }

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
            <a href={mensagemLinkBot.link}>{mensagemLinkBot.link}</a>
          </Box>
        }

        <VStack display={!formDepartamento ? 'none' : 'initial'} className='slide-top' borderRadius={'25px 25px 0 0'} boxShadow={'0px -4px 6px rgba(0, 0, 0, 0.2)'} pt={4} px={6} zIndex={999} pos={'fixed'} bottom={0} pb={10} left={0} bg={'white'} w={'100%'} >
          {chatDadosIniciais?.dadosInicializacao?.map((buttons, index) => (
            <Button mt={1} _hover={{ bg: 'green', color: 'white' }} rounded={'2xl'} key={index} w={'100%'}
              onClick={() => { clickDepartamento(buttons) }} value={buttons.value} >
              {buttons.label}
            </Button>
          ))}
        </VStack>

        {formMenu &&
          <VStack overflowY={'scroll'} display={!formMenu ? 'none' : 'initial'} className='slide-top' borderRadius={'25px 25px 0 0'} boxShadow={'0px -4px 6px rgba(0, 0, 0, 0.2)'} pt={4} px={6} zIndex={999} pos={'fixed'} bottom={0} pb={6} left={0} bg={'white'} maxH={'80vh'} w={'100%'} >
            {listapreTags?.map((buttons, index) => (
              <Button display={buttons.value === 9 && 'none'} overflowWrap="break-word" whiteSpace={'wrap'} mt={1} _hover={{ bg: 'green', color: 'white' }} rounded={'2xl'} key={index} w={'100%'}
                value={buttons.value} onClick={() => { clickMenu(buttons) }}>
                {buttons.label}
              </Button>
            ))}
          </VStack>
        }

        {visibilidadeListaMenus &&
          <VStack overflowY={'scroll'} display={!visibilidadeListaMenus ? 'none' : 'initial'} className='slide-top' borderRadius={'25px 25px 0 0'} boxShadow={'0px -4px 6px rgba(0, 0, 0, 0.2)'} pt={4} px={6} zIndex={999} pos={'fixed'} bottom={0} pb={6} left={0} bg={'white'} maxH={'80vh'} w={'100%'} >
            {listaMenus?.map((buttons, index) => (
              <Button overflowWrap="break-word" whiteSpace={'wrap'} mt={1} _hover={{ bg: 'green', color: 'white' }} rounded={'2xl'} key={index} w={'100%'}
                value={buttons.value} onClick={() => { tagsPrincipais(buttons) }}>
                {buttons.label}
              </Button>
            ))}
          </VStack>
        }

        <VStack display={elementosTagsFinal.length > 0 ? 'initial' : 'none'} className='slide-top' borderRadius={'25px 25px 0 0'} boxShadow={'0px -4px 6px rgba(0, 0, 0, 0.2)'} pt={4} px={6} zIndex={999} pos={'fixed'} bottom={0} pb={10} left={0} bg={'white'} w={'100%'} >
          {elementosTagsFinal?.map((buttons, index) => (
            <Button mt={1} _hover={{ bg: 'green', color: 'white' }} rounded={'2xl'} key={index} w={'100%'}
              onClick={() => { tagsPrincipais(buttons) }} value={buttons.value} >
              {buttons.label}
            </Button>
          ))}
        </VStack>

        {visibilidadeInput &&
          <Flex>
            <Button w={'max-content'} pos={'absolute'} right={4} margin={' 10px auto'} gap={2}
              display={'flex'} alignItems={'center'} justifyContent={'center'}
              borderRadius={'20px 0 20px 20px'}
              boxShadow={'lg'}
              onClick={() => {
                location.reload()
              }}>
              <FaRegArrowAltCircleLeft fontSize={20} /> Click para voltar ao menu inicial
            </Button>
            <Box gap={2} display={'flex'} alignItems={'center'} justifyContent={'center'} ml={-2} w={'100%'} borderRadius={'25px 25px 0 0'} p={4} bg={'gray.600'} pos={'absolute'} bottom={'-2'} >
              <Input bg={'white'} rounded={'2xl'} mt={-1}
                onChange={(e) => { setValueInput(e.target.value) }}
                value={valueInput}
                placeholder='Digite... ' />
              <Button _hover={{ bg: 'transparent' }} bg={'transparent'} mt={-1} rounded={'lg'} onClick={valorInput}>
                <IoMdSend color='white' fontSize={30} />
              </Button>
            </Box>
          </Flex>
        }
      </Box>
    </ChakraProvider>
  )
}
