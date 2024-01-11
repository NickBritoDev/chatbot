// @ts-nocheck
import React, { useRef, useState } from 'react'
import { BsPlusLg, BsFillImageFill, BsCameraReelsFill, BsFilePdf } from 'react-icons/bs'
import { IoMdSend } from 'react-icons/io'
import { RiFileExcel2Fill } from 'react-icons/ri'
import { useDispatch, useSelector } from 'react-redux'

import { Box, Image, Icon, useDisclosure, Text, Button, Slide, Spinner, AspectRatio } from '@chakra-ui/react'

import { executar } from '../../../features/toast/toastSlice'
import useUploadArquivo from '../hooks/useUploadDeArquivos'

function UploadArquivos () {
  const { enviarArquivo, isLoading } = useUploadArquivo()
  const { informacao } = useSelector((state) => state.blocoInformacaoAtendimento)
  const dispatch = useDispatch()
  const [showCard, setShowCard] = useState(false)
  const [rotatePlusIcon, setRotatePlusIcon] = useState(false)
  const { isOpen, onToggle } = useDisclosure()
  const [nomeArquivo, setNomeArquivo] = useState('')
  const [showFade, setShowFade] = useState(false)
  const imageInputRef = useRef(null)
  const videoInputRef = useRef(null)
  const [selectedFile, setSelectedFile] = useState(null) // Altere 'File' para o tipo de arquivo que você está manipulando
  const pdfInputRef = useRef(null)
  const [imagemSelecionada, setImagemSelecionada] = useState(null) // Altere 'File' para o tipo de arquivo que você está manipulando
  const [videoSelecionado, setVideoSelecionada] = useState(null) // Altere 'File' para o tipo de arquivo que você está manipulando
  const [pdfSelecionado, setPdfSelecionado] = useState(null) // Altere 'File' para o tipo de arquivo que você está manipulando
  const excelInputRef = useRef(null)
  const [excelSelecionado, setExcelSelecionado] = useState(null) // Altere 'File' para o tipo de arquivo que você está manipulando

  const handleImageIconClick = () => {
    imageInputRef.current?.click()
  }

  const handleImageChange = (e) => {
    setImagemSelecionada(null)
    setVideoSelecionada(null)
    setPdfSelecionado(null)
    setExcelSelecionado(null)
    const file = e.target.files[0]
    if (file?.type.startsWith('image/')) {
      setSelectedFile(file)
      setShowFade(true)
      setNomeArquivo(file.name)
      setShowCard(false)
      const imageUrl = URL.createObjectURL(file)
      setImagemSelecionada(imageUrl)
      onToggle()
    } else {
      dispatch(executar(Object({
        trigger: true,
        msg: 'Selecione apenas imagens',
        status: 'warning'
      })))
    }
  }

  const handleVideoIconClick = () => {
    videoInputRef.current?.click()
  }

  const handleVideoChange = (e) => {
    const file = e.target.files[0]
    setImagemSelecionada(null)
    setVideoSelecionada(null)
    setPdfSelecionado(null)
    setExcelSelecionado(null)
    if (file?.type.startsWith('video/')) {
      setSelectedFile(file)
      setShowFade(true)
      setNomeArquivo(file.name)
      setShowCard(false)
      const video = URL.createObjectURL(file)
      setVideoSelecionada(video)
      onToggle()
    } else {
      dispatch(executar(Object({
        trigger: true,
        msg: 'Selecione apenas videos',
        status: 'warning'
      })))
    }
  }

  const handleExcelIconClick = () => {
    excelInputRef.current?.click()
  }

  const handleExcelChange = (e) => {
    setImagemSelecionada(null)
    setVideoSelecionada(null)
    setPdfSelecionado(null)
    setExcelSelecionado(null)
    const file = e.target.files[0]

    setSelectedFile(file)
    setShowFade(true)
    setNomeArquivo(file.name)
    setShowCard(false)
    const url = URL.createObjectURL(file)
    setExcelSelecionado(url)
    onToggle()
  }

  const handlePdfIconClick = () => {
    pdfInputRef.current?.click()
  }

  const handlePdfChange = (e) => {
    setImagemSelecionada(null)
    setVideoSelecionada(null)
    setPdfSelecionado(null)
    setExcelSelecionado(null)
    const file = e.target.files[0]
    if (file?.type.startsWith('application/pdf')) {
      setSelectedFile(file)
      setShowFade(true)
      setNomeArquivo(file.name)
      setShowCard(false)
      const url = URL.createObjectURL(file)
      setPdfSelecionado(url)
      onToggle()
    } else {
      dispatch(executar(Object({
        trigger: true,
        msg: 'Selecione apenas PDF',
        status: 'warning'
      })))
    }
  }

  const handlePlusIconClick = () => {
    setRotatePlusIcon((prev) => !prev)
    setShowCard((prev) => !prev)
  }

  const handleSubmit = async () => {
    if (selectedFile !== null) {
      const formData = new FormData()
      formData.append('file', selectedFile)
      formData.append('idProtocolo', informacao.idProtocolo)
      await enviarArquivo(formData)
      onToggle()
      setImagemSelecionada(null)
      setVideoSelecionada(null)
      setSelectedFile(null)
      setShowFade(false)
      setNomeArquivo('')
    }
  }

  return (
    <>
      <Box mb={{ base: '-11px', md: '-5px' }}>

        {showCard && (
          <Box
            display={'flex'}
            flexDir={'column'}
            justifyContent={'center'}
            alignItems={'left'}
            bg='white'
            boxShadow='md'
            borderRadius='6px 6px 6px  0'
            zIndex={9999}
            pos={'fixed'}
            bottom={{ base: 10, md: 16 }}
            left={{ base: 12, md: '20' }}
          >
            <Box
              cursor={'pointer'}
              p={2}
              _hover={{
                bg: 'gray.100',
                color: 'black'
              }}
              onClick={handleImageIconClick}
            >
              <p>
                <Icon color={'#1794bb'} mr={2} as={BsFillImageFill} />
                Imagem
              </p>
            </Box>
            <input
              type='file'
              style={{ display: 'none' }}
              ref={imageInputRef}
              onChange={handleImageChange}
              accept='image/*'
            />

            <Box
              cursor={'pointer'}
              p={2}
              _hover={{
                bg: 'gray.100',
                color: 'black'
              }}
              onClick={handleVideoIconClick}
            >
              <p>
                <Icon color={'#e0322f'} mr={2} as={BsCameraReelsFill} />
                Vídeo
              </p>
            </Box>
            <input
              type='file'
              style={{ display: 'none' }}
              ref={videoInputRef}
              onChange={handleVideoChange}
              accept='video/*'
            />

            <Box
              cursor={'pointer'}
              p={2}
              _hover={{
                bg: 'gray.100',
                color: 'black'
              }}
              onClick={handleExcelIconClick}
            >
              <p>
                <Icon color={'green'} mr={2} as={RiFileExcel2Fill} />
                Excel
              </p>
            </Box>
            <input
              type='file'
              style={{ display: 'none' }}
              ref={excelInputRef}
              onChange={handleExcelChange}
              accept='*'
            />

            <Box
              cursor={'pointer'}
              p={2}
              _hover={{
                bg: 'gray.100',
                color: 'black'
              }}
              onClick={handlePdfIconClick}
            >
              <p>
                <Icon color={'#6312bf'} mr={2} as={BsFilePdf} />
                PDF
              </p>
            </Box>
            <input
              type='file'
              style={{ display: 'none' }}
              ref={pdfInputRef}
              onChange={handlePdfChange}
              accept='application/pdf'
            />
          </Box>
        )}
        {showFade
          ? (
            <>
              {!isLoading
                ? (
                  <>
                    <Button onClick={() => {
                      setShowFade(false)
                      onToggle()
                    }}
                      fontSize={24}
                      borderRadius={'50%'} w={'40px'}
                      bottom={'3.5%'}
                      right={20}
                      pos={'absolute'}
                      zIndex={99}
                      textAlign={'center'} pt={0.5}>
                      X
                    </Button>
                    <Icon
                      onClick={handleSubmit}
                      bottom={'4.5%'}
                      right={1}
                      pos={'absolute'}
                      zIndex={999}
                      rounded={'md'}
                       w={'60px'}
                      h={'42px'} bg={'green'}
                      color={'white'}
                      cursor={'pointer'} ml={4} p={2} as={IoMdSend} />
                  </>
                  )
                : (
                  <Spinner bottom={'5%'}
                    speed='0.65s'
                    emptyColor='gray.200'
                    color='#229544'
                    right={8}
                    pos={'absolute'}
                    zIndex={99} />
                  )}

            </>
            )
          : (
            <Icon onClick={handlePlusIconClick}
              transform={`rotate(${rotatePlusIcon ? '135deg' : '0deg'})`}
              transition='transform 0.3s ease-in-out' borderRadius={'50%'} w={'50px'}
              h={'50px'} bg={rotatePlusIcon ? 'gray.400' : 'gray.300'}
              color={rotatePlusIcon ? 'white' : 'white'}
              cursor={'pointer'} ml={4} p={2} as={BsPlusLg} />
            )}

      </Box>
      <Slide in={isOpen} >
        <Box h={{ base: '87.2%', md: '520px' }} w={{ base: '100%', md: '80%' }} top={{ base: 'initial', md: '19%' }} bottom={{ base: 0, md: 'initial' }} rounded={'2xl'} right={'0.5%'} alignItems={'center'} flexDir={'column'} justifyContent={'center'} bg={'gray.300'} pos={'fixed'} display={showFade ? 'flex' : 'none'}>
          <Text pos={'absolute'} bottom={'80px'} fontSize='sm' color='black' textAlign={'center'} px={1} textTransform={'uppercase'} zIndex={9999}>
            {nomeArquivo}
          </Text>
          <>
            {isLoading && <Spinner thickness='4px'
              speed='0.65s'
              emptyColor='gray.200'
              color='#229544'
              size='xl' />}

            {(!isLoading && videoSelecionado) && (
              <AspectRatio zIndex={999} h={'350px'} mt={'-80px'} w={{ base: '90%', md: '560px' }} ratio={1}>
                <iframe title={nomeArquivo} src={videoSelecionado} allowFullScreen />
              </AspectRatio>
            )}

            {(!isLoading && imagemSelecionada) && (
              <Image pos={'absolute'} margin={'10px auto'} mt={'-80px'} maxW={{ base: '100%', md: '750px' }} maxH={'350px'} src={imagemSelecionada} alt='Preview da imagem selecionada' />
            )}

            {(!isLoading && pdfSelecionado) && (
              <AspectRatio mt={'-90px'} w={{ base: '90%', md: '560px' }} h={'350px'} ratio={1}>
                <iframe title={nomeArquivo} src={pdfSelecionado} allowFullScreen />
              </AspectRatio>
            )}

            {(!isLoading && excelSelecionado) && (
              <Box mt={'-90px'} w='560px' h={'350px'} display={'flex'} flexDir={'column'} alignItems={'center'} justifyContent={'center'}>
                <Text fontWeight={'semibold'} color={'black'}>Planilha Selecionada</Text>
                <Icon as={RiFileExcel2Fill} fontSize={'6xl'} color={'green'} mt={2} />
              </Box>
            )}
          </>

        </Box>

      </Slide>
    </>
  )
}

export default UploadArquivos
