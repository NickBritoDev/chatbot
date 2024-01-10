import { useQuery } from 'react-query'

import api from '../../../services/api'

const useGetPesquisas = (payload) => {
  return useQuery(
    ['chat_useGetPesquisas', { payload }],
    async () => {
      const response = await api.get('/v1/api/public/pesquisas', {
        params: payload
      })
      return response.data
    },
    {
      refetchOnWindowFocus: false,
      staleTime: 60000 * 60 * 2
    }
  )
}

export { useGetPesquisas }
