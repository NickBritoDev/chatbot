/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  abrirDadosProposta: false,
  propostas: {}
}

export const toastSlice = createSlice({
  name: 'proposta',
  initialState,
  reducers: {
    executar: (state, action) => {
      Object.keys(action.payload).forEach((key) => {
        state[key] = action.payload[key]
      })
    }
  }
})

export const { executar } = toastSlice.actions

export default toastSlice.reducer
