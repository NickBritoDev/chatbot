import { configureStore } from '@reduxjs/toolkit'

import atendimentoReducer from './atendimento/atendimentoSlice'
import blocoInformacaoAtendimentoReducer from './blocoInformacaoAtendimento/index'
import propostaReducer from './chatbotWha/propostaSlice'
import configAppReducer from './configApp/index'
import navigateSlice from './navigate/navigateSlice'
import perfilreducer from './perfil/perfilSlice'
import rhSlice from './rh/rhSlice'
import toasterReducer from './toast/toastSlice'

const store = configureStore({
  reducer: {
    configApp: configAppReducer,
    atendimento: atendimentoReducer,
    filtroDetabelaDeCampanhas: rhSlice,
    toast: toasterReducer,
    blocoInformacaoAtendimento: blocoInformacaoAtendimentoReducer,
    perfil: perfilreducer,
    proposta: propostaReducer,
    navigate: navigateSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})

export default store
