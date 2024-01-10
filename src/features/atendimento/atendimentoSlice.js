/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  dadosAtendimento: {},
  statusAtendimento: {},
  listaDeAtendimentos: [],
  obtendoHistoricoAtendimento: []
}

export const atendimentoSlice = createSlice({
  name: 'atendimento',
  initialState,
  reducers: {
    obtendoDadosAtendimento: (state, action) => {
      Object.keys(action.payload).forEach((key) => {
        state[key] = action.payload[key]
      })
    },

    obtendoStatusAtendimento: (state, action) => {
      Object.keys(action.payload).forEach((key) => {
        state[key] = action.payload[key]
      })
    },

    atualizandoDadosAtendimento: (state, action) => {
      Object.keys(state).forEach((key) => {
        state[key] = { ...state[key], ...action.payload }
      })
    }

  }
})

export const { obtendoDadosAtendimento, atualizandoDadosAtendimento, obtendoStatusAtendimento } = atendimentoSlice.actions

export default atendimentoSlice.reducer
