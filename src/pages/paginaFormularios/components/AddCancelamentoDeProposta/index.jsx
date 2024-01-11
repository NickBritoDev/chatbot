/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
// @ts-nocheck

import React, { useState } from 'react'
import { BsFillPersonXFill } from 'react-icons/bs'
import { useMutation } from 'react-query'

import {
  Icon, Input, Spinner, FormControl, Flex, Box,
  FormLabel,
  Heading, Button, FormErrorMessage, Divider, Select, Skeleton
} from '@chakra-ui/react'
import { useFormik, FormikProvider } from 'formik'

import handleButtonClick from '../../../../helpers/loadingButton/loadingButton'
import mask from '../../../../helpers/mascaras/maskCfpCnpj'
import api from '../../../../services/api'
import { useGetBancos } from './hooks/useGetBancos'
import formCreateFormsWeb from './schemaForm'

const AddCancelamentoDeProposta = ({ nome, codpage }) => {
  console.log(codpage)
  const [isLoadingButton, setIsLoadingButton] = useState(false)
  const { isLoading, data } = useGetBancos()
  const listaBancos = data?.bancos || []

  const formik = useFormik({
    enableReinitialize: false,
    initialValues: {
      motivoSolicitacao: '',
      cpf: '',
      proposta: '',
      banco: ''
    },
    validationSchema: formCreateFormsWeb,
    onSubmit: (payload) => {
      payload.codpage = codpage
      handlerNovoConvenio.mutate(payload)
      setTimeout(() => {
        location.reload()
      }, 1000)
    }
  })

  const listaMotivacoes = [
    {
      motivo_cancelamento1: '-'
    },
    {
      motivo_cancelamento1: 'CONDICOES COMERCIAIS'
    },
    {
      motivo_cancelamento1: 'ERROS TECNICOS'
    },
    {
      motivo_cancelamento1: 'PEDIDO DO CLIENTE'
    },
    {
      motivo_cancelamento1: 'DECURSO DE PRAZO'
    }
  ]

  const SelectOptonMotivos = listaMotivacoes.map(({ motivo_cancelamento1 }) => (
    <option key={motivo_cancelamento1} value={motivo_cancelamento1}>{motivo_cancelamento1}</option>
  ))

  const SelectOptonBancos = listaBancos.map(({ nome }) => (
    <option key={nome} value={nome}>{nome}</option>
  ))

  const { values, errors, touched, handleSubmit, resetForm, handleChange } = formik

  const handlerNovoConvenio = useMutation(async (payload) => {
    const response = await api.post('/v1/api/public/cancelamentoDeProposta', payload)
    return response.data
  }, {
    onSuccess: (data) => {
      resetForm()
    }
  })

  const canSubmit = () => {
    return (
      values.proposta !== '' &&
      values.cpf !== '' &&
      values.motivoSolicitacao !== '' &&
      values.banco !== ''
    )
  }

  return (
    <>
      <Flex pos={'fixed'} zIndex={9999} top={20} flexDir={'column'} align={'center'} bg={'white'} justify='center' h='100vh' m={0} fontSize='md'>
        <Box boxShadow={'2xl'} bg='white' p={8} w={'100vw'} rounded='md' mt={-40}>
          <Flex alignItems={'center'} justifyContent={'space-between'}>
            <Flex flexDir={'column'}>
              <Heading fontSize={20}>Solicitação de Cancelamento</Heading>
              <Heading mb={4} color={'gray.600'} fontSize={16}>{nome}</Heading>
            </Flex>
            <Icon boxShadow={'md'} mb={4} borderRadius={'12px 0 12px 12px'} p={2} w={'50px'} h={'50px'} bg={'red.500'} color={'white'} fontSize={24} as={BsFillPersonXFill} />
          </Flex>
          <Divider />
          <FormikProvider value={formik}>
            <form onSubmit={handleSubmit}>
              <FormControl isInvalid={errors.proposta && touched.proposta}>
                <FormLabel mt={4}>Proposta</FormLabel>
                <Input
                  placeholder='Proposta'
                  autoComplete={false}
                  id='proposta'
                  name='proposta'
                  type='text'
                  variant='outline'
                  onChange={handleChange}
                  value={values.proposta}
                />
                {(touched.proposta === true) && errors.proposta && (
                  <FormErrorMessage>
                    {errors.proposta}
                  </FormErrorMessage>
                )}
              </FormControl>
              <FormControl isInvalid={errors.cpf && touched.cpf}>
                <FormLabel mt={2}>CPF</FormLabel>
                <Input
                  maxLength={14}
                  placeholder='CPF'
                  autoComplete={false}
                  id='cpf'
                  name='cpf'
                  type='text'
                  variant='outline'
                  onChange={handleChange}
                  value={mask(values.cpf)}
                />
                {touched.cpf && errors.cpf && (
                  <FormErrorMessage>
                    {errors.cpf}
                  </FormErrorMessage>
                )}
              </FormControl>
              <FormControl isInvalid={errors.motivoSolicitacao && touched.motivoSolicitacao}>
                <FormLabel mt={2}>Motivo</FormLabel>
                <Select
                  id='motivoSolicitacao'
                  name='motivoSolicitacao'
                  onChange={handleChange}
                  value={values.motivoSolicitacao}
                >
                  {!isLoading ? (<>{SelectOptonMotivos}</>) : (<Skeleton />)}

                </Select>
                {touched.banco && errors.banco && (
                  <FormErrorMessage>
                    {errors.motivoSolicitacao}
                  </FormErrorMessage>
                )}
              </FormControl>
              <FormControl isInvalid={errors.banco && touched.banco}>
                <FormLabel mt={2}>Bancos</FormLabel>
                <Select
                  id='banco'
                  name='banco'
                  onChange={handleChange}
                  value={values.banco}
                >
                  {!isLoading ? (<>{SelectOptonBancos}</>) : (<Skeleton />)}

                </Select>
                {touched.banco && errors.banco && (
                  <FormErrorMessage>
                    {errors.banco}
                  </FormErrorMessage>
                )}
              </FormControl>
              <Button
                _hover={{
                  bg: '#229544',
                  color: 'white',
                  boxShadow: 'md'
                }}
                mt={4}
                bg={'green'}
                color={'white'}
                textTransform={'uppercase'}
                type='submit'
                width='full'
                variant='solid'
                onClick={() => { handleButtonClick(setIsLoadingButton) }}
                {...!canSubmit && isLoadingButton}
              >
                {isLoadingButton ? 'Solicitando Cancelamento...' : 'Solicitar Cancelamento'}
                {isLoadingButton && <Spinner ml={2} />}
              </Button>
            </form>
          </FormikProvider>
        </Box>
      </Flex>
    </>
  )
}

export default AddCancelamentoDeProposta
