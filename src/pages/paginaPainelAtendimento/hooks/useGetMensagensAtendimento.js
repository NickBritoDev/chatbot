import { useQuery } from 'react-query'

import api from '../../../services/api'

const useGetMensagensAtendimento = (payload) => {
  return useQuery(
    ['chat_useGetMensagensAtendimento', { payload }],
    async () => {
      const response = await api.get('/v1/api/public/atendimentoMensagens', {
        params: payload
      })
      return response.data.mensagens
    },
    {
      refetchOnWindowFocus: true,
      staleTime: 2500,
      refetchInterval: payload.idProtocolo ? 2500 : false,
      enabled: !!payload.idProtocolo
    }
  )
}

export { useGetMensagensAtendimento }
