import axios from 'axios'

import store from '../features/index'
import { executarNavigate } from '../features/navigate/navigateSlice'
import { executar } from '../features/toast/toastSlice'

const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 30000
})

const { dispatch } = store

api.interceptors.request.use(
  (config) => {
    const search = window.location.search
    const params = new URLSearchParams(search)
    const token = params.get('token')

    if (token) {
      config.headers['x-access-token'] = token
    } else {
      config.headers['x-access-token'] = undefined
    }

    return config
  },
  (error) => Promise.reject(error)
)

api.interceptors.response.use(
  async (response) => {
    if (response?.data?.notification) {
      const { message } = response.data.notification
      const toastConfig = {
        trigger: true,
        msg: message,
        status: 'success'
      }

      dispatch(executar(Object(toastConfig)))
    }
    return Promise.resolve(response)
  },
  async (error) => {
    const { message } = error.response.data.notification
    if (error.response.status === 400) {
      const toastConfig = {
        trigger: true,
        msg: message,
        status: 'warning'
      }

      dispatch(executar(Object(toastConfig)))

      return Promise.reject(error?.response)
    }

    dispatch(executarNavigate({ codigoHttp: error.response.status }))
    return Promise.reject(error?.response)
  }
)

export default api
