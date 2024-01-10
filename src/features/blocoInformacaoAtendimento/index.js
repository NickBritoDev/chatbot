/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  informacao: {
    departamento: undefined,
    idDepartamento: undefined,
    idProtocolo: undefined,
    usuario: undefined,
    idUsuario: undefined,
    agente: undefined,
    status: undefined,
    primeiraInteracaoAgente: undefined,
    tempoDeAtendimento: undefined
  }
}

export const informacoesDeAtendimentoAppSlice = createSlice({
  name: 'informacoesDeatendimentos',
  initialState,
  reducers: {
    INFORMACOES_ATENDIMENTOS: (state, action) => {
      Object.keys(action.payload).forEach((key) => {
        state.informacao[key] = action.payload[key]
      })
    }
  }
})

export const { INFORMACOES_ATENDIMENTOS } = informacoesDeAtendimentoAppSlice.actions

export default informacoesDeAtendimentoAppSlice.reducer
