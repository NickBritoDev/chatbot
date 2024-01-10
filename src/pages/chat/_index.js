import React, { useEffect, useState } from 'react'
import { addLinkSnippet, Widget, addResponseMessage, setQuickButtons, addUserMessage, toggleMsgLoader, toggleInputDisabled } from 'react-chat-widget'
import { useMutation } from 'react-query'

import api from '../../services/api'
import 'react-chat-widget/lib/styles.css'
import '@fontsource/poppins'
import './style.css'
import { useGetInicializacao } from './hooks/useGetInicializacao'
import LoginChat from './components/LoginChat'

export default function Chat () {
  const { data: dadosIniciais, isLoading: isLoadingDadosInicializacao } = useGetInicializacao()
  const chatDadosIniciais = dadosIniciais || {}
  const [elementosTags, setElementosTags] = useState(null)
  const [linkResposta, setLinkResposta] = useState(null)
  const [mensagemBot, setMensagemBot] = useState(null)
  const [idPretag, setIdPretag] = useState(null)
  const [mensagemLinkBot, setMensagemLinkBot] = useState(null)
  const [mostraInputText, setMostrarInput] = useState(false)
  const [textoCaixa, setTextoCaixa] = useState('...')
  const [listaPreTags, setListaPreTags] = useState([])

  function horaAgora () {
    const data = new Date()
    return data.toLocaleString('pt-br')
  }

  const selecionarDepatamento = useMutation(async (payload) => {
    const response = await api.post('/v1/api/chat/' + linkResposta, payload)
    return response.data
  }, {
    onSuccess: (data) => {
      const { mensagem, menuOpcoes, linkApiResposta } = data
      setMensagemBot(mensagem)
      setElementosTags(menuOpcoes)
      setListaPreTags(menuOpcoes)
      setLinkResposta(linkApiResposta)
      toggleMsgLoader()
    },
    onError: (_err) => {
      erroChat()
    }
  })

  const selecionandoMenu = useMutation(async (payload) => {
    const response = await api.post('/v1/api/chat/' + linkResposta, payload)
    return response.data
  }, {
    onSuccess: (data) => {
      const { mensagem, preTagsMenus, linkApiResposta, mostrarInput } = data

      if (!mostrarInput) {
        setElementosTags(preTagsMenus)
      }

      if (mostrarInput) {
        setTextoCaixa('Digite:')
        const valorTag = preTagsMenus.map((tag) => tag.value)
        setIdPretag(valorTag[0])
        setLinkResposta('selecionandoMenu')
        setElementosTags([{
          value: 'back',
          label: '#MUDARDEOPCAO'
        }])
      }

      setMensagemBot(`${mensagem} \n\n ${horaAgora()}`)
      setMostrarInput(mostrarInput)

      setLinkResposta(linkApiResposta)
      toggleMsgLoader()
    },
    onError: (_err) => {
      erroChat()
    }
  })

  const selecionandoTags = useMutation(async (payload) => {
    const response = await api.post('/v1/api/chat/' + linkResposta, payload)
    return response.data
  }, {
    onSuccess: (data) => {
      const { mensagem, respostas, toLink } = data
      let resposta = ''
      respostas.forEach((msg) => {
        resposta += `${msg}\n`
      })
      document.querySelector('.rcw-input').textContent = ''
      const mensagemFormatada = ` 📑 ${mensagem} \n ${resposta}`
      if (toLink) {
        setMensagemLinkBot({
          title: `${mensagem} \n\n ${horaAgora()}`,
          link: resposta.replace('chatbot', 'chatbotapp')
        })
        setElementosTags([{
          value: 'reset',
          label: '#VOLTARMENUINICIAL'
        },
        {
          value: 'falarComAtendente',
          label: '#FALARCOMATENDENTE'
        }])
        setLinkResposta('selecionandoTags')
        return
      }

      setMensagemBot(`${mensagemFormatada} \n\n ${horaAgora()}`)
      setElementosTags([{
        value: 'reset',
        label: '#VOLTARMENUINICIAL'
      },
      {
        value: 'falarComAtendente',
        label: '#FALARCOMATENDENTE'
      }])
      document.querySelector('.loader').style.display = 'none'
    },
    onError: (_err) => {
      erroChat()
    }
  })

  useEffect(() => {
    if (selecionandoTags.isLoading) {
      toggleMsgLoader()
    }
  }, [selecionandoTags.isLoading])

  useEffect(() => {
    if (isLoadingDadosInicializacao === false) {
      const { mensagem, dadosInicializacao, linkApiResposta } = chatDadosIniciais
      setElementosTags(dadosInicializacao)
      setLinkResposta(linkApiResposta)
      setMensagemBot(mensagem)
    }
  }, [chatDadosIniciais, isLoadingDadosInicializacao])

  useEffect(() => {
    if (mensagemBot !== null) {
      addResponseMessage(mensagemBot)
    }
  }, [mensagemBot])

  useEffect(() => {
    if (mensagemLinkBot !== null) {
      const { link } = mensagemLinkBot
      const novoLink = document.createElement('a')
      novoLink.href = link
      novoLink.click()
      addLinkSnippet(mensagemLinkBot)
    }
  }, [mensagemLinkBot])

  function sleep (ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  useEffect(() => {
    if (elementosTags && Array.isArray(elementosTags)) {
      setQuickButtons(elementosTags)
    }
  }, [elementosTags])

  useEffect(() => {
    if (mostraInputText !== undefined) {
      toggleInputDisabled()
    }
  }, [mostraInputText])

  async function handleQuickButtonClicked (value) {
    if (value === 'falarComAtendente') {
      selecionandoTags.mutate({
        idPretag: value
      })
      setMostrarInput(false)
      setElementosTags([])

      const valorSelecionadoResposta = elementosTags.filter((e) => e.value === value)

      addUserMessage('☑️ ' + valorSelecionadoResposta[0]?.label)
      toggleMsgLoader()
      await sleep(1000)
      return
    }

    if (value === 'reset') {
      setLinkResposta('selecionandoDepartamento')
      setMostrarInput(false)
      return setElementosTags(chatDadosIniciais.dadosInicializacao)
    }

    if (value === 'back') {
      setLinkResposta('selecionandoMenu')
      setMostrarInput(false)
      return setElementosTags(listaPreTags)
    }

    setElementosTags([])

    const valorSelecionadoResposta = elementosTags.filter((e) => e.value === value)

    addUserMessage('☑️ ' + valorSelecionadoResposta[0]?.label)
    toggleMsgLoader()
    await sleep(1000)

    if (linkResposta === 'selecionandoDepartamento') {
      selecionarDepatamento.mutate({
        idDepartamento: value
      })
    }

    if (linkResposta === 'selecionandoMenu') {
      selecionandoMenu.mutate({
        idMenu: value
      })
    }

    if (linkResposta === 'selecionandoTags') {
      selecionandoTags.mutate({
        idPretag: value
      })
    }
  }

  async function handleToggleChat (value) {
    if (value) {
      setLinkResposta('selecionandoDepartamento')
      setElementosTags(chatDadosIniciais.dadosInicializacao)
      setMostrarInput(false)
    }
  }

  function handleTextInputSend (value) {
    const regex = /^[0-9 !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]*$/g
    if (!regex.test(value)) {
      setMensagemBot('⚠️ Apenas números e caracteres especiais são permitidos!\n Exemplo: 123.654.789-10')
      document.querySelector('.rcw-input').textContent = ''
    } else if (!value) {
      setMensagemBot('⚠️ Você não informou os dados!')
      document.querySelector('.rcw-input').textContent = ''
    } else {
      document.querySelector('.loader').style.display = 'flex'
      selecionandoTags.mutate({
        idPretag,
        filtroPesquisa: value
      })
      document.querySelector('.rcw-input').textContent = ''
      setMostrarInput(false)
    }
  }

  function erroChat () {
    document.querySelector('.loader').style.display = 'none'
    addResponseMessage('❌ Opx! Ocorreu um erro, tente novamente em instante!')
    setElementosTags([{
      value: 'reset',
      label: '#VOLTARMENUINICIAL'
    }])
  }

  const [isTokenRoute, setIsTokenRoute] = useState(false)

  useEffect(() => {
    const currentPath = window.location.href
    setIsTokenRoute(currentPath.includes('token'))
  }, [])

  return (
    <div className='App'>
      {!isTokenRoute
        ? (
        <LoginChat/>
          )
        : (
        <Widget
        showTimeStamp = { false }
        autofocus = { false }
        senderPlaceHolder = { textoCaixa }
        handleToggle = { handleToggleChat }
        profileClientAvatar = 'https://appbancos.s3.sa-east-1.amazonaws.com/PORTALGMVB706d5e281f4f6c93039a1321f4e9e87f-user-not-specified.png'
        profileAvatar = 'https://appbancos.s3.sa-east-1.amazonaws.com/PORTALGMVBe359d4bd5235306459f58e846d953c46-bot-icon-gif.gif'
        emojis = { false }
        fullScreenMode = { false }
        title = { null }
        handleSubmit = { handleTextInputSend }
        handleQuickButtonClicked = { handleQuickButtonClicked }
        subtitle = { null }
        titleAvatar = 'https://appbancos.s3.sa-east-1.amazonaws.com/PORTALGMVB3bea7bfd145a0867b4d1c652b5833de6-white copy.png'
      />
          )}
    </div>
  )
}
