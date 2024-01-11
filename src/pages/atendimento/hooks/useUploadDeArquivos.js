import { useMutation, useQueryClient } from 'react-query'

import api from '../../../services/apiAdmin'

const useUploadArquivo = () => {
  const queryClient = useQueryClient()
  const uploadArquivo = async (formData) => {
    await api.post('/v1/api/public/arquivo', formData)
  }

  const mutation = useMutation(uploadArquivo)

  const enviarArquivo = async (formData) => {
    await mutation.mutateAsync(formData)
    queryClient.invalidateQueries('atendimento_useObtendoMensagensAtendimentos')
  }

  return {
    enviarArquivo,
    isLoading: mutation.isLoading,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess
  }
}

export default useUploadArquivo
