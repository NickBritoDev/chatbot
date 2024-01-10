/* eslint-disable camelcase */
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  filtroDetabelaDeCampanhas: {}
}

export const filtroDetabelaDeCampanhas = createSlice({
  name: 'campanhasWppfiltro',
  initialState,
  reducers: {
    campanha_entrevistas_rh: (state, action) => {
      Object.keys(action.payload).forEach((key) => {
        state[key] = action.payload[key]
      })
    }
  }
})

export const { campanha_entrevistas_rh } = filtroDetabelaDeCampanhas.actions

export default filtroDetabelaDeCampanhas.reducer
