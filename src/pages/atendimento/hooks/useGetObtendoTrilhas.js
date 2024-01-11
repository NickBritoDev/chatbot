import { useQuery } from 'react-query'

import api from '../../../services/api'

const useGetobtendoTrilha = (payload) => {
  return useQuery(
    ['chat_useGetobtendoTrilha', { payload }],
    async () => {
      const response = await api.get('/v1/api/public/obtendoTrilha', {
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

export { useGetobtendoTrilha }
