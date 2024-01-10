/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { BsNewspaper } from 'react-icons/bs'
import { useMutation } from 'react-query'

import {
  Icon, Image, Spinner, Text, useToast, FormControl, Flex, Box,
  FormLabel,
  Input,
  Heading, Button, FormErrorMessage, Divider, Select, Skeleton
} from '@chakra-ui/react'
import { useFormik, FormikProvider } from 'formik'

import logo from '../../../../assets/icon.png'
import handleButtonClick from '../../../../helpers/loadingButton/loadingButton'
import api from '../../../../services/api'
import { useGetBancos } from './hooks/useGetBancos'
import formCreateFormsWeb from './schemaForm'

export default function AddNovoConvenio ({ formulario }) {
  const [isLoadingButton, setIsLoadingButton] = useState(false)
  const toast = useToast()
  const { nome, urlPost, codpage } = formulario
  const { isLoading, data } = useGetBancos()
  const listaBancos = data?.bancos || []

  const formik = useFormik({
    enableReinitialize: false,
    initialValues: {
      nome: '',
      banco: ''
    },
    validationSchema: formCreateFormsWeb,
    onSubmit: (payload) => {
      payload.codpage = codpage
      handlerNovoConvenio.mutate(payload)
    }
  })

  const SelectOptonBancos = listaBancos.map(({ nome }) => (
    <option key={nome} value={nome}>{nome}</option>
  ))

  const { values, errors, touched, handleSubmit, resetForm, handleChange } = formik

  const handlerNovoConvenio = useMutation(async (payload) => {
    const response = await api.post('/v1/api/public/' + urlPost, payload)
    return response.data
  }, {
    onSuccess: (data) => {
      resetForm()
      toast({
        title: 'Convênio cadastrado com Sucesso',
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
      <Flex flexDir={'column'} align={'center'} justify='center' h='max-content' m={0} fontSize='md'>
        <Image mt={-4} width={'70px'} src={logo} />
        <Text textTransform={'uppercase'} fontWeight={'bold'} fontSize={18}>Portal Mais Valor</Text>
        <Box boxShadow={'2xl'} bg='white' p={8} w={'100vh'} rounded='md' mt={2}>
          <Flex alignItems={'center'} justifyContent={'space-between'}>
            <Flex flexDir={'column'}>
              <Heading fontSize={20}>Criação de Novo Convênio</Heading>
              <Heading mb={4} color={'gray.600'} fontSize={16}>{nome}</Heading>
            </Flex>
            <Icon boxShadow={'md'} mb={4} borderRadius={'12px 0 12px 12px'} p={2} w={'50px'} h={'50px'} bg={'blue.500'} color={'white'} fontSize={24} as={BsNewspaper} />
          </Flex>
          <Divider />
          <FormikProvider value={formik}>
            <form onSubmit={handleSubmit}>
              <FormControl isInvalid={errors.nome && touched.nome}>
                <FormLabel mt={4}>Convênio</FormLabel>
                <Input
                  placeholder='Convênio'
                  autoComplete={false}
                  id='nome'
                  name='nome'
                  type='text'
                  variant='outline'
                  onChange={handleChange}
                  value={values.nome}
                />
                {touched.nome && errors.nome && (
                  <FormErrorMessage>
                    {errors.nome}
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
                  {!isLoading ? (<>{SelectOptonBancos}</>) : (<Skeleton/>)}

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
                mt={6}
                bg={'green'}
                color={'white'}
                textTransform={'uppercase'}
                type='submit'
                width='full'
                variant='solid'
                onClick={() => handleButtonClick(setIsLoadingButton)}
                {...!canSubmit && isLoadingButton}
              >
                {isLoadingButton ? 'Solicitando Novo Convênio...' : 'Solicitar Novo Convênio'}
                {isLoadingButton && <Spinner ml={2} />}
              </Button>
            </form>
          </FormikProvider>
        </Box>
      </Flex>
    </>
  )
}
