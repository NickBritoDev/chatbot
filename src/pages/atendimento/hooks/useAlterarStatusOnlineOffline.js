import { useMutation } from 'react-query'

import apiAdmin from '../../../services/apiAdmin'

const useAlterarStatusOnlineOffline = () => {
  const alterarStatusOnlineOffline = async (payload) => {
    const response = await apiAdmin.post('/v1/api/public/indicador-online', payload)

    if (response.status === 200) {
      mutation.isSuccess = true
      mutation.isError = false
    }

    if (response.status !== 200) {
      mutation.isSuccess = false
      mutation.isError = true
    }
  }

  const mutation = useMutation(alterarStatusOnlineOffline)

  const UseRequestAlterarStatusOnlineOffline = (payload) => {
    mutation.mutate(payload)
  }
  return {
    UseRequestAlterarStatusOnlineOffline
  }
}

export { useAlterarStatusOnlineOffline }
