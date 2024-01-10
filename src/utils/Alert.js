import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { useToast } from '@chakra-ui/react'

import { executar } from '../features/toast/toastSlice'

export default function Alert () {
  const toast = useToast()
  const res = useSelector((state) => state.toast)
  const dispatch = useDispatch()
  React.useEffect(() => {
    if (res.trigger) {
      toast({
        title: res.msg,
        status: res.status,
        duration: 3000,
        isClosable: true,
        position: 'top-right'
      })
      dispatch(executar({ trigger: false }))
    }
  }, [res, toast, dispatch])

  return (
    <></>
  )
}
