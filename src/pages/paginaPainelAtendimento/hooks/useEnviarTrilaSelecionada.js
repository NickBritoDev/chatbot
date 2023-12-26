import { useMutation } from 'react-query'

import apiAdmin from '../../../services/apiAdmin'

const useEnviarTrilaSelecionada = () => {
  const envioDeTrilha = async (payload) => {
    const response = await apiAdmin.post('/v1/api/public/selecionarTrilha', payload)

    if (response.status === 200) {
      mutation.isSuccess = true
      mutation.isError = false
    }

    if (response.status !== 200) {
      mutation.isSuccess = false
      mutation.isError = true
    }
  }

  const mutation = useMutation(envioDeTrilha)

  const UseRequestuseEnvioDeTrilha = (payload) => {
    mutation.mutate(payload)
  }
  return {
    UseRequestuseEnvioDeTrilha,
    isLoading: mutation.isLoading,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess
  }
}

export { useEnviarTrilaSelecionada }
