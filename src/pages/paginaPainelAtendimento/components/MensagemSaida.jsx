/* eslint-disable react/prop-types */
import React from 'react'
import { BsCheckAll, BsDownload, BsFilePdf } from 'react-icons/bs'
import { RiFileExcel2Fill } from 'react-icons/ri'

import { Text, VStack, Box, Image, Icon, AspectRatio } from '@chakra-ui/react'

import formatDataChat from '../../../helpers/dataHora/formatDataChat'

export default function MensagemSaida ({ autor, mensagem, data, mimetype, originalname, foto, searchTerm, mensagemLida }) {
  function highlightText (msg, highlight) {
    const regex = new RegExp(`(${highlight})`, 'gi')
    return msg.split(regex).map((part, index) =>
      part.toString().toLowerCase() === highlight.toString().toLowerCase()
        ? (
          <span key={index} style={{ fontWeight: 'bold', background: '#eddc8a' }}>
            {part}
          </span>
          )
        : (
          <span key={index}>{part}</span>
          )
    )
  }

  function isImage (mimetype) {
    if (mimetype === null) {
      return false
    }
    return mimetype.includes('image')
  }

  function isVideo (mimetype) {
    if (mimetype === null) {
      return false
    }
    return mimetype.includes('video')
  }

  function isPDF (mimetype) {
    if (mimetype === null) {
      return false
    }
    return mimetype.includes('pdf')
  }
  function isExcel (mimetype) {
    if (mimetype === null) {
      return false
    }
    return mimetype.includes('sheet')
  }

  return (
    <>
      <Box mr={{ base: '1', md: '-24' }} mb={{ base: 2, md: 0 }} display={'flex'} alignItems={'center'} justifyContent={'flex-end'}>

        <Text display={'flex'} mr={-2} color={'black'} fontWeight={'medium'}
          fontSize={12}>
          <Box mr={1} mt={-0.5}>
            <BsCheckAll fontSize={'22px'} color={mensagemLida ? '#0267C3' : 'gray'} />
          </Box>
          {formatDataChat(data)}
        </Text>
        <Text
          ml={4}
          display={{ base: 'none', md: 'flex' }}
          alignItems={'center'}
          justifyContent={'right'}
          fontSize={12}>
          {autor}
          <Image rounded={'50%'} w={'35px'} h={'35px'} src={foto} ml={2} mb={4} mt={6} />
        </Text>
      </Box>

      <Box position={'relative'} left={{ base: '6%', md: '11%' }} ml={'20%'} display={'flex'} alignItems={'flex-end'} justifyContent={'right'}>
        <VStack
          boxShadow={'md'}
          mr={4}
          p={3}
          mt={-2}
          bg={'gray.100'}
          minW={'25%'}
          maxW={'75%'}
          display={'inline-flex'}
          textAlign={'right'}
          alignItems='rigth'
          borderRadius={'10px 0 10px 10px'}>

          <Text
            color={'#fff'}
            fontWeight={'semibold'}
            fontSize={14}>
            {isImage(mimetype)
              ? (
                <>
                  <Image maxW={{ base: '150px', md: '300px' }} src={mensagem} alt='Preview da imagem selecionada' />
                  <a target='_blank' href={mensagem} rel='noreferrer'>
                    <Text color={'black'} mt={2} ml={2}><Icon fontSize={22} as={BsDownload} /></Text>
                  </a>
                </>
                )
              : isVideo(mimetype)
                ? (
                  <>
                    <AspectRatio h={'250px'} w={{ base: '200px', md: '260px' }} ratio={1}>
                      <video controls title='video' controlsList='nodownload'>
                        <track kind='captions' srcLang='pt' label='Portuguese' />
                        <source src={mensagem} />
                      </video>
                    </AspectRatio>
                    <a target='_blank' href={mensagem} rel='noreferrer'>
                      <Text color={'black'} mt={2} ml={2}><Icon fontSize={22} as={BsDownload} /></Text>
                    </a>
                  </>
                  )
                : isPDF(mimetype)
                  ? (
                    <>
                      <a target='_blank' href={mensagem} rel='noreferrer'>
                        <Box display={'flex'} align={'center'} justifyContent={'center'} gap={2} >
                          <Icon rounded={8} bg={'white'} color={'red'} padding={1} w={'30px'} h={'30px'} mt={1} fontSize={22} as={BsFilePdf} />
                          <Text color={'black'} mt={2} mr={2}>{originalname} </Text>
                          <Icon color={'black'} mt={1} fontSize={22} as={BsDownload} />
                        </Box>
                      </a>
                    </>
                    )
                  : isExcel(mimetype)
                    ? (
                      <>
                        <a target='_blank' href={mensagem} rel='noreferrer'>
                          <Box display={'flex'} align={'center'} justifyContent={'center'} gap={2} >
                            <Icon rounded={8} bg={'white'} color={'green'} padding={1} w={'30px'} h={'30px'} mt={1} fontSize={22} as={RiFileExcel2Fill} />
                            <Text color={'black'} mt={2} mr={2}>{originalname} </Text>
                            <Icon color={'black'} mt={1} fontSize={22} as={BsDownload} />
                          </Box>
                        </a>
                      </>
                      )
                    : (
                      <Text color={'black'}>{highlightText(mensagem, searchTerm)}</Text>
                      )}
          </Text>

        </VStack>
      </Box>

    </>
  )
}
