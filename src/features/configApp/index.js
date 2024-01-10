/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  moduleSelected: 'default'
}

export const configAppSlice = createSlice({
  name: 'configApp',
  initialState,
  reducers: {
    CONFIG_APP: (state, action) => {
      Object.keys(action.payload).forEach((key) => {
        state[key] = action.payload[key]
      })
    }
  }
})

export const { CONFIG_APP } = configAppSlice.actions

export default configAppSlice.reducer
