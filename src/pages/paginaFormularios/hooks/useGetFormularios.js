import { useQuery } from 'react-query'

import api from '../../../services/api'

const useGetFormularios = (payload) => {
  return useQuery(
    ['chat_useGetFormularios', { payload }],
    async () => {
      const response = await api.get('/v1/api/public/formularios', {
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

export { useGetFormularios }
