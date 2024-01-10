/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  features: [],
  perfil: {}
}

export const perfilSlice = createSlice({
  name: 'perfil',
  initialState,
  reducers: {
    OBTENDO_PERFIL: (state, action) => {
      Object.keys(action.payload).forEach((key) => {
        state[key] = action.payload[key]
      })
    }
  }
})

export const { OBTENDO_PERFIL } = perfilSlice.actions

export default perfilSlice.reducer
