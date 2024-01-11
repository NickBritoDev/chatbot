/* eslint-disable react/prop-types */
/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
// @ts-nocheck
import React, { useState } from 'react'
import { BsCalendar2Event } from 'react-icons/bs'
import { useMutation } from 'react-query'

import {
  Icon, Spinner, useToast, FormControl, Flex, Box,
  FormLabel,
  Input,
  Heading, Button, FormErrorMessage, Divider, Select, Skeleton
} from '@chakra-ui/react'
import { useFormik, FormikProvider } from 'formik'

import handleButtonClick from '../../../../helpers/loadingButton/loadingButton'
import api from '../../../../services/api'
import { useGetBancos } from './hooks/useGetBancos'
import { useGetHorariosAtendimentos } from './hooks/useGetHorariosAtendimentos'
import formCreateFormsWeb from './schemaForm'

const AddDataRetorno = ({ nome, codpage }) => {
  const [isLoadingButton, setIsLoadingButton] = useState(false)
  const toast = useToast()
  const { isLoading, data } = useGetBancos()
  const listaBancos = data?.bancos || []
  const { isLoading: horariosAtendimentosLoading, data: horariosDeAtendimentos } = useGetHorariosAtendimentos()
  const listaHorariosDeAtendimentos = horariosDeAtendimentos?.opcaoHorarios || []

  const formik = useFormik({
    enableReinitialize: false,
    initialValues: {
      proposta: '',
      cpf: '',
      banco: '',
      dataRetorno: new Date().toISOString().split('T')[0],
      horaRetorno: '08:00 as 08:59'
    },
    validationSchema: formCreateFormsWeb,
    onSubmit: (payload) => {
      payload.codpage = codpage
      handlerCadastrandoDataDeRetorno.mutate(payload)
      setTimeout(() => {
        location.reload()
      }, 1000)
    }
  })

  const SelectOptonConvenios = listaBancos.map(({ nome }) => (
    <option key={nome} value={nome}>{nome}</option>
  ))

  const SelectHorariosAtendimentos = listaHorariosDeAtendimentos.map((nome) => (
    <option key={nome} value={nome}>{nome}</option>
  ))

  const { values, errors, touched, handleSubmit, resetForm, handleChange } = formik

  const handlerCadastrandoDataDeRetorno = useMutation(async (payload) => {
    const response = await api.post('/v1/api/public/cadastrarDataDeRetornoCliente', payload)
    return response.data
  }, {
    onSuccess: (data) => {
      resetForm()
      toast({
        title: 'Data de Retorno cadastrado com Sucesso',
        description: 'A Equipe de Atendimento vai analisar sua solicitação!',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top-right'
      })
    }
  })

  const canSubmit = () => {
    return (
      values.proposta !== '' &&
      values.banco !== '' &&
      values.dataRetorno !== '' &&
      values.horaRetorno !== ''
    )
  }

  return (
    <>
      <Flex pos={'fixed'} zIndex={9999} top={20} flexDir={'column'} align={'center'} bg={'white'} justify='center' h='100vh' m={0} fontSize='md'>
        <Box boxShadow={'2xl'} bg='white' p={8} w={'100vw'} rounded='md' mt={-40}>
          <Flex alignItems={'center'} justifyContent={'space-between'}>
            <Flex flexDir={'column'}>
              <Heading fontSize={20}>Solicitação de Data de Retorno</Heading>
              <Heading mb={4} color={'gray.600'} fontSize={16}>{nome}</Heading>
            </Flex>
            <Icon boxShadow={'md'} mb={4} borderRadius={'12px 0 12px 12px'} p={2} w={'50px'} h={'50px'} bg={'green.500'} color={'white'} fontSize={24} as={BsCalendar2Event} />
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
                  bg={'white'}
                />
                {touched.proposta && errors.proposta && (
                  <FormErrorMessage>
                    {errors.proposta}
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
                  {!isLoading ? (<>{SelectOptonConvenios}</>) : (<Skeleton />)}

                </Select>
                {touched.banco && errors.banco && (
                  <FormErrorMessage>
                    {errors.banco}
                  </FormErrorMessage>
                )}
              </FormControl>
              <FormControl isInvalid={errors.dataRetorno && touched.dataRetorno}>
                <FormLabel mt={2}>Data Retorno</FormLabel>
                <Input
                  placeholder='dataRetorno'
                  id='dataRetorno'
                  name='dataRetorno'
                  type='date'
                  variant='outline'
                  onChange={handleChange}
                  value={values.dataRetorno}
                />
                {touched.dataRetorno && errors.dataRetorno && (
                  <FormErrorMessage>
                    {errors.dataRetorno}
                  </FormErrorMessage>
                )}
              </FormControl>
              <FormControl isInvalid={errors.horaRetorno && touched.horaRetorno}>
                <FormLabel mt={2}>Hora Retorno</FormLabel>
                <Select
                  id='horaRetorno'
                  name='horaRetorno'
                  onChange={handleChange}
                  value={values.horaRetorno}
                >
                  {!horariosAtendimentosLoading ? (<>{SelectHorariosAtendimentos}</>) : (<Skeleton />)}

                </Select>
                {touched.horaRetorno && errors.horaRetorno && (
                  <FormErrorMessage>
                    {errors.horaRetorno}
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
                {isLoadingButton ? 'Solicitando Data...' : 'Solicitar Data'}
                {isLoadingButton && <Spinner ml={2} />}
              </Button>
            </form>
          </FormikProvider>
        </Box>
      </Flex>
    </>
  )
}

export default AddDataRetorno
