/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  codigoHttp: ''
}

export const navigateSlice = createSlice({
  name: 'navigate',
  initialState,
  reducers: {
    executarNavigate: (state, action) => {
      Object.keys(action.payload).forEach((key) => {
        state[key] = action.payload[key]
      })
    }
  }
})

export const { executarNavigate } = navigateSlice.actions

export default navigateSlice.reducer
