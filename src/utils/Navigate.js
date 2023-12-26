import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function Navigate () {
  const res = useSelector((state) => state.navigate)
  const navigate = useNavigate()

  React.useEffect(() => {
    if (res.codigoHttp !== '') {
      navigate(`/public/${res.codigoHttp}`)
    }
  }, [res, navigate])

  return (
    <></>
  )
}
