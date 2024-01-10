/* eslint-disable no-mixed-operators */

import React from 'react'
import { useQuery } from 'react-query'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useRoutes, useLocation } from 'react-router-dom'

import { OBTENDO_PERFIL } from './features/perfil/perfilSlice'
import ChatApp from './layouts/Chat'
import Public from './layouts/Public'
import Chat from './pages/chat/index'
import PAGE401 from './pages/errors/401/index'
import PAGE404 from './pages/errors/404/index'
import PAGE500 from './pages/errors/500/index'
import PaginaFormularios from './pages/paginaFormularios/index'
import PaginaResposta from './pages/paginaResposta/index'
import Login from './pages/public/login/index'
import apiAdmin from './services/apiAdmin'
import PaginaPainelAtendimento from './pages/paginaPainelAtendimento'
import PainelAtendimento from './layouts/PainelAtendimento'

export default function Router () {
  const { features } = useSelector((state) => state.perfil)

  const location = useLocation()
  const { data, isLoading } = useQuery(
    ['chat_useGetPerfil'],
    async () => {
      const response = await apiAdmin.get('/v1/api/admin/conta/obtendo')
      return response.data
    },
    {
      refetchOnWindowFocus: true,
      staleTime: 1000 * 60 * 5,
      refetchInterval: 60000 * 60,
      enabled: location.pathname.includes('admin')
    }
  )

  const routing = useRoutes([
    {
      path: '/app',
      children: [
        { path: 'chat', element: <Chat /> }
      ]
    },
    {
      path: '/chatResponse',
      element: <ChatApp />,
      children: [
        { path: 'selectPage', element: <PaginaResposta /> },
        { path: 'formWeb', element: <PaginaFormularios /> }

      ]
    },
    {
      path: '/public',
      element: <Public />,
      children: [
        { path: 'login', element: <Login /> }
      ]
    },
    {
      path: '/public',
      element: <Public />,
      children: [
        { path: '404', element: <PAGE404 /> }
      ]
    },
    {
      path: '/public',
      element: <Public />,
      children: [
        { path: '401', element: <PAGE401 /> }
      ]
    },
    {
      path: '/public',
      element: <Public />,
      children: [
        { path: '500', element: <PAGE500 /> }
      ]
    },
    {
      path: '/atendimento',
      element: <PainelAtendimento />,
      children: [
        { path: 'chat', element: <PaginaPainelAtendimento /> }
      ]
    },
    { path: '*', element: <Navigate to='/public/404' replace /> },
    { path: '/', element: <Navigate to='/app/chat' replace /> }
  ])
  const dispatch = useDispatch()

  React.useEffect(() => {
    if (data !== undefined) {
      dispatch(OBTENDO_PERFIL(data))
    }
  }, [dispatch, data])

  if (isLoading || features.length === 0 && location.pathname.includes('admin')) {
    return <>Loading</>
  }

  return routing
}
