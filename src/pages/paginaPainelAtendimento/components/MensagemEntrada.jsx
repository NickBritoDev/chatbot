/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
import React from 'react'
import { BsDownload, BsFilePdf } from 'react-icons/bs'
import { RiFileExcel2Fill } from 'react-icons/ri'

import { Text, VStack, Icon, AspectRatio, Box, Image } from '@chakra-ui/react'

import formatDataChat from '../../../helpers/dataHora/formatDataChat'
export default function MensagemEntrada ({ autor, mensagensRespondida_direcao, mensagem, data, mimetype, originalname, foto, searchTerm, mensagemRespondida, mensagemRespondida_mimetype, mensagemRespondida_originalname }) {
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
      <Text
        mb={4}
        ml={{ base: -2, md: 0 }}
        display={'flex'}
        alignItems={'center'}
        justifyContent={'left'}
        fontSize={{ base: 10, md: 12 }}>
        <Image w={'35px'} h={'35px'} rounded={'50%'} src={foto} mr={2} />
        {autor}
        <Text ml={2} color={'black'} fontWeight={'medium'}
          fontSize={12}>
          {formatDataChat(data)}
        </Text>
      </Text>

      <VStack
        boxShadow={'md'}
        ml={{ base: 2, md: 4 }}
        mt={-2}
        p={3}
        bg={'#229544'}
        border={'solid 1px #239645'}
        maxW={'75%'}
        display={'inline-flex'}
        alignItems='left'
        borderRadius={'0 10px 10px 10px'}>

        {mensagemRespondida && mensagemRespondida_mimetype && isImage(mensagemRespondida_mimetype)
          ? (
            <Box bg={'green.700'} p={'2px 5px'} borderRadius={'4px 0 4px 4px'} fontSize={'12px'} borderLeft={'solid 3px #CBD5E0'}>
              <Text color={'white'}>
                {mensagensRespondida_direcao === 'in' ? 'VOCÊ' : autor}:
              </Text>
              <Image maxW={'350px'} src={mensagemRespondida} alt='Preview da imagem selecionada' />
            </Box>
            )
          : mensagemRespondida && !mensagemRespondida_mimetype && (
            <Box bg={'green.700'} p={'2px 5px'} borderRadius={'4px 0 4px 4px'} fontSize={'12px'} borderLeft={'solid 3px #CBD5E0'}>
              <Text color={'white'}>
                {mensagensRespondida_direcao === 'in' ? 'VOCÊ' : autor}:
              </Text>
              <Text color={'white'}>
                {mensagemRespondida}
              </Text>
            </Box>
          )}

        {mensagemRespondida && mensagemRespondida_mimetype && isVideo(mensagemRespondida_mimetype) &&
          <Box bg={'green.700'} p={'2px 5px'} borderRadius={'4px 0 4px 4px'} fontSize={'12px'} borderLeft={'solid 3px #CBD5E0'}>
            <Text color={'white'}>
              {mensagensRespondida_direcao === 'in' ? 'VOCÊ' : autor}:
            </Text>
            <AspectRatio h={'250px'} w='260px' ratio={1}>
              <video controls title='video' controlsList='nodownload'>
                <track kind='captions' srcLang='pt' label='Portuguese' />
                <source src={mensagemRespondida} />
              </video>
            </AspectRatio>
          </Box>
        }

        {mensagemRespondida && mensagemRespondida_mimetype && isPDF(mensagemRespondida_mimetype) &&
          <Box bg={'green.700'} p={'2px 5px'} borderRadius={'4px 0 4px 4px'} fontSize={'12px'} borderLeft={'solid 3px #CBD5E0'}>
            <Text color={'white'}>
              {mensagensRespondida_direcao === 'in' ? 'VOCÊ' : autor}:
            </Text>
            <a target='_blank' href={mensagemRespondida} rel='noreferrer'>
              <Box display={'flex'} align={'center'} justifyContent={'center'} gap={2} >
                <Icon rounded={8} bg={'white'} color={'red'} padding={1} w={'30px'} h={'30px'} mt={1} fontSize={22} as={BsFilePdf} />
                <Text mt={1} mr={2}>{highlightText(mensagemRespondida_originalname, searchTerm)} </Text>
              </Box>
            </a>
          </Box>
        }

        {mensagemRespondida && mensagemRespondida_mimetype && isExcel(mensagemRespondida_mimetype) &&
          <Box bg={'green.700'} p={'2px 5px'} borderRadius={'4px 0 4px 4px'} fontSize={'12px'} borderLeft={'solid 3px #CBD5E0'}>
            <Text color={'white'}>
              {mensagensRespondida_direcao === 'in' ? 'VOCÊ' : autor}:
            </Text>
            <a target='_blank' href={mensagem} rel='noreferrer'>
              <Box display={'flex'} align={'center'} justifyContent={'center'} gap={2} >
                <Icon rounded={8} bg={'white'} color={'green'} padding={1} w={'30px'} h={'30px'} mt={1} fontSize={22} as={RiFileExcel2Fill} />
                <Text mt={1} mr={2}>{highlightText(mensagemRespondida_originalname, searchTerm)} </Text>
              </Box>
            </a>
          </Box>
        }

        <Text
          color={'#fff'}
          fontWeight={'semibold'}
          fontSize={14}>
          {isImage(mimetype)
            ? (
              <>
                <Image maxW={{ base: '150px', md: '300px' }} src={mensagem} alt='Preview da imagem selecionada' />
                <a target='_blank' href={mensagem} rel='noreferrer'>
                  <Text mt={2} ml={2}><Icon fontSize={22} as={BsDownload} /></Text>
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
                    <Text mt={2} ml={2}><Icon fontSize={22} as={BsDownload} /></Text>
                  </a>
                </>
                )
              : isPDF(mimetype)
                ? (
                  <>
                    <a target='_blank' href={mensagem} rel='noreferrer'>
                      <Box display={'flex'} align={'center'} justifyContent={'center'} gap={2} >
                        <Icon rounded={8} bg={'white'} color={'red'} padding={1} w={'30px'} h={'30px'} mt={1} fontSize={22} as={BsFilePdf} />
                        <Text mt={2} mr={2}>{originalname} </Text>
                        <Icon mt={1} fontSize={22} as={BsDownload} />
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
                          <Text mt={2} mr={2}>{originalname} </Text>
                          <Icon mt={1} fontSize={22} as={BsDownload} />
                        </Box>
                      </a>
                    </>
                    )
                  : (
                    <Text>{highlightText(mensagem, searchTerm)}</Text>
                    )}
        </Text>

      </VStack>
    </>
  )
}
