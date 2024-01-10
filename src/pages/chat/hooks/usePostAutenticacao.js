import { useMutation } from 'react-query'
import api from '../../../services/api'

const usePostAutenticacao = () => {
  const autenticacao = async (payload) => {
    const response = await api.post('/v1/api/public/autenticacao', payload)
    return response.data
  }

  const mutation = useMutation(autenticacao)

  const UseRequestPostAutenticacao = async (usuario, senha) => {
    const result = await mutation.mutateAsync(
      usuario,
      senha
    )
    return result
  }

  return {
    UseRequestPostAutenticacao,
    isLoading: mutation.isLoading,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess
  }
}

export { usePostAutenticacao }
