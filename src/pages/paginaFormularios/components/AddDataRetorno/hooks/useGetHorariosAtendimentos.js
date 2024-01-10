import { useQuery } from 'react-query'

import api from '../../../../../services/api'

const useGetHorariosAtendimentos = () => {
  return useQuery(
    ['chat_useGetHorariosAtendimentos'],
    async () => {
      const response = await api.get('/v1/api/public/horarioDeAtendimento')
      return response.data
    },
    {
      staleTime: 5000 * 60 * 2
    }
  )
}

export { useGetHorariosAtendimentos }
