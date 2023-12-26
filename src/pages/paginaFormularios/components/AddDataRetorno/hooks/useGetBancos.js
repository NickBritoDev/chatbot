import { useQuery } from 'react-query'

import api from '../../../../../services/api'

const useGetBancos = () => {
  return useQuery(
    ['chat_useGetConvenios'],
    async () => {
      const response = await api.get('/v1/api/public/bancos')
      return response.data
    },
    {
      staleTime: 5000 * 60 * 2
    }
  )
}

export { useGetBancos }
