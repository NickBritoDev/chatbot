import { useQuery } from 'react-query'

import api from '../../../services/api'

const useGetInicializacao = () => {
  return useQuery(
    'chat_inicializacao',
    async () => {
      const response = await api.get('/v1/api/chat/inicializacao')
      return response.data
    },
    {
      refetchOnWindowFocus: false,
      staleTime: 60000 * 60 * 2
    }
  )
}

export { useGetInicializacao }
