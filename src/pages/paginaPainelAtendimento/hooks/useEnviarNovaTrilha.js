import { useMutation, useQueryClient } from 'react-query'

import api from '../../../services/api'

const useNovaTrilha = () => {
  const queryClient = useQueryClient()
  const enviarNovaTrilha = async (payload) => {
    const response = await api.post('/v1/api/public/inserirTrilha', payload)

    if (response.status === 200) {
      queryClient.invalidateQueries('nova_trilha_selecionada')
    }
  }

  const mutation = useMutation(enviarNovaTrilha)

  const UseRequestEnviarNovaTrilha = (payload) => {
    mutation.mutate(payload)
  }
  return {
    UseRequestEnviarNovaTrilha,
    isLoading: mutation.isLoading
  }
}

export { useNovaTrilha }
