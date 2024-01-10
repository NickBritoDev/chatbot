import { useMutation } from 'react-query'

import apiAdmin from '../../../services/apiAdmin'

const useCancelarAtendimentoAutomaticamente = () => {
  const cancelamentoAtendimento = async (payload) => {
    const response = await apiAdmin.post('/v1/api/public/encerrar-atendimento', payload)

    if (response.status === 200) {
      mutation.isSuccess = true
      mutation.isError = false
    }

    if (response.status !== 200) {
      mutation.isSuccess = false
      mutation.isError = true
    }
  }

  const mutation = useMutation(cancelamentoAtendimento)

  const UseRequestuseCancelamentoDeAtendimento = (payload) => {
    mutation.mutate(payload)
  }
  return {
    UseRequestuseCancelamentoDeAtendimento
  }
}

export { useCancelarAtendimentoAutomaticamente }
