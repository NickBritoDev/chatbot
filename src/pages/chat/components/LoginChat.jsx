/* eslint-disable camelcase */
/* eslint-disable react/prop-types */

import React from 'react'
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  ChakraProvider,
  Box,
  Text,
  Image,
  VStack,
  FormErrorMessage
} from '@chakra-ui/react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { usePostAutenticacao } from '../hooks/usePostAutenticacao'
import { GoDependabot } from 'react-icons/go'
import logo from '../../../assets/icon.png'
import '../animations/form.css'
import '../animations/logo.css'
import { useFormik } from 'formik'
import formValidadtionSchema from '../schema/formSchema'

export default function LoginChat () {
  const { UseRequestPostAutenticacao } = usePostAutenticacao() // Utilizamos o hook inteiro, não destructuring

  const [show, setShow] = React.useState(false)
  const handleClick = () => { setShow(!show) }

  if ((localStorage.getItem('TKC') != null) && !window.location.href.includes('token=')) {
    const currentUrl = window.location.href
    const separator = currentUrl.includes('?') ? '&' : '?'
    const newUrl = `${currentUrl}${separator}token=${localStorage.getItem('TKC')}`
    window.location.href = newUrl
    return null
  }

  const handleLogin = async (payload) => {
    const response = await UseRequestPostAutenticacao(payload) // Corrigindo o uso da função
    const currentUrl = window.location.href
    const separator = currentUrl.includes('?') ? '&' : '?'
    const newUrl = `${currentUrl}${separator}token=${response.id_acesso}`
    window.location.href = newUrl
    localStorage.setItem('TKC', response.id_acesso)
  }

  const formik = useFormik({
    enableReinitialize: false,
    initialValues: {
      usuario: '',
      senha: ''
    },
    validationSchema: formValidadtionSchema,
    onSubmit: (payload) => {
      handleLogin(payload)
      formik.resetForm() // Utilizando resetForm do formik
    }
  })

  // eslint-disable-next-line no-unused-vars
  const { values, errors, touched, handleSubmit, resetForm, handleChange } = formik

  return (
    <ChakraProvider>
      <Box
        h={'100vh'}
        display={'flex'}
        flexDirection={'column'}
        borderRadius={'40px 40px 0 0'}
        w={{ base: '100%', md: '500px', lg: '650px' }}
        justifyContent="space-around"
        color={'white'}
      >
        <Box bg="black" filter="grayscale(40%) blur(4px)" bgImage="url('https://cdn.forbes.com.mx/2023/03/Chat-bots-Inteligencia-Artificial.jpg')"
          bgSize="cover"
          bgPosition="center"
          bgRepeat="no-repeat"
          w="100%" h={'80vh'} pos={'fixed'} top={0}>

        </Box>
        <VStack w={'100vw'} margin={'10px auto'} className='scale-up-top' mt={{ base: '-90%', md: '-90%', lg: '-60%', sm: '-60%' }}>
          <Image bg={'rgba(98, 87, 148, 0.4)'} p={6} boxShadow={'2xl'} borderRadius={'50%'} mt={12} width={'130px'} src={logo} />
          <Text
            color={'gray.100'} mt={2} display={'flex'} gap={2} alignItems={'center'}
            justifyContent={'center'} fontFamily={'sans-serif'}
            fontWeight={'bold'} fontSize={{ base: '26', md: '28', lg: '30' }} >
            Chatbot
            <GoDependabot fontSize={40} />
            <Text>Mais Valor</Text>
          </Text>
        </VStack>

        <VStack className='scale-up-bottom' boxShadow={'2xl'} pos={'absolute'} bottom={-1} borderRadius={'50px 50px 0 0'} w={'100%'} bg={'gray.600'} >
          <form onSubmit={handleSubmit}>
            <FormControl id="usuario" >
              <FormLabel fontSize={{ base: '16', md: '18', lg: '20' }} mt={8} ml={1}>Usuario</FormLabel>
              <Input
                fontSize={{ base: '14', md: '16', lg: '18' }}
                _placeholder={{ color: 'white' }}
                borderRadius={'25px'}
                type="text"
                placeholder="seu usuario"
                onChange={handleChange}
                value={values.usuario}
              />
              {touched.usuario && errors.usuario && (
                <FormErrorMessage display={'flex'} alignItems={'center'} justifyContent={'center'} w={'100%'} textAlign={'center'}>
                  {errors.usuario}
                </FormErrorMessage>
              )}
            </FormControl>

            <FormControl id="senha" >
              <FormLabel fontSize={{ base: '16', md: '18', lg: '20' }} mt={4} ml={1}>Senha</FormLabel>
              <InputGroup size='md'>
                <Input
                  fontSize={{ base: '14', md: '16', lg: '18' }}
                  _placeholder={{ color: 'white' }}
                  borderRadius={'25px'}
                  pr='4.5rem'
                  type={show ? 'text' : 'password'}
                  placeholder='sua senha'
                  onChange={handleChange}
                  value={values.senha}
                />
                <InputRightElement width='4.5rem'>
                  <Button h='1.75rem' size='sm' onClick={handleClick}>
                    {show ? <FaEye /> : <FaEyeSlash />}
                  </Button>
                </InputRightElement>
              </InputGroup>
                {touched.senha && errors.senha && (
                  <FormErrorMessage display={'flex'} alignItems={'center'} justifyContent={'center'} w={'100%'} textAlign={'center'}>
                    {errors.senha}
                  </FormErrorMessage>
                )}
            </FormControl>
            <Button mt={8} fontSize={{ base: '16', md: '18', lg: '20' }} w={'100%'} mb={12} borderRadius={'25px'} type="submit" colorScheme="green">
              Acessar Chatbot
            </Button>
          </form>
        </VStack>
      </Box>
    </ChakraProvider >
  )
}
