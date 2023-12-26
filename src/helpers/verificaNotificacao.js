import store from '../features'
import { obtendoDadosAtendimento } from '../features/atendimento/atendimentoSlice'
import queryClient from '../services/reactQueryClient'

export default function checkPageStatus (message, dadosAtendimento) {
  const { dispatch } = store

  function sendNotification (message) {
    const notification = new Notification('Chat Online', {
      icon: 'https://www.portalmaisvalor.com/assets/img/brand/favicon.png',
      close: false,
      body: `${message}`
    })
    notification.onclick = () => {
      queryClient.removeQueries('atendimento_useObtendoMensagensAtendimentos')
      dispatch(obtendoDadosAtendimento({ dadosAtendimento }))
      queryClient.invalidateQueries('atendimento_useObtendoMensagensAtendimentos')
      window.focus('/admin/atendimento')
    }
  }

  if (!('Notification' in window)) {
    alert('This browser does not support system notifications!')
  } else if (Notification.permission === 'granted') {
    if (document.hidden) {
      sendNotification(message)
    }
  } else if (Notification.permission !== 'denied') {
    Notification.requestPermission((permission) => {
      if (permission === 'granted') {
        sendNotification(message)
      }
    })
  }
}
