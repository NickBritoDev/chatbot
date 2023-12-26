import { useQuery } from 'react-query'

import api from '../../../../services/api'

const useGetAuth = (payload) => {
  return useQuery(
    ['chat_useGetAuth', { payload }],
    async () => {
      const response = await api.get('/v1/api/public/auth', {
        params: payload
      })
      return response.data
    },
    {
      refetchOnWindowFocus: true,
      staleTime: 60000,
      enabled: !!payload.h
    }
  )
}

export { useGetAuth }
