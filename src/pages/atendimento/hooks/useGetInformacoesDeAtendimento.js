import { useQuery } from 'react-query'

import api from '../../../services/api'

const useGetInformacoesDeAtendimento = (payload) => {
  return useQuery(
    ['chat_useGetInformacoesDeAtendimento', { payload }],
    async () => {
      const response = await api.get('/v1/api/public/informacoesDeAtendimento', {
        params: payload
      })
      return response.data
    },
    {
      refetchOnWindowFocus: true,
      staleTime: 2500,
      refetchInterval: 2500
    }
  )
}

export { useGetInformacoesDeAtendimento }
