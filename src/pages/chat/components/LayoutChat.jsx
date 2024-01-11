import { Avatar, AvatarBadge, Box, ChakraProvider, Flex, Icon, Text, Wrap, WrapItem } from '@chakra-ui/react'
import React from 'react'
import bot from '../../../assets/bot1.png'
import logo from '../../../assets/icon.png'
import InteracaoChat from './InteracaoChat'
import { GoDependabot } from 'react-icons/go'

export default function LayoutChat () {
  return (
    <ChakraProvider>
      <Box overflowX={'hidden'} overflowY={'scroll'} bg="white" bgImage={logo}
        bgPosition="center"
        bgRepeat="no-repeat"
        w="100%" h={'82vh'}>

        <Flex w={'100%'} pos={'fixed'} bg={'gray.600'} textAlign={'center'} alignItems={'center'} borderRadius={'0 0 25px 25px'} zIndex={9999}>
          <Wrap textAlign={'center'} w={'100%'} display={'flex'} alignItems={'center'} px={4} py={1} >
            <WrapItem border={'solid 2px white'} borderRadius={'50%'} boxShadow={'2xl'}>
              <Avatar name='Dan Abrahmov' src={bot} >
                <AvatarBadge borderColor='white' bg='green' boxSize='1.25em' />
              </Avatar>
            </WrapItem>
          </Wrap>
          <Box gap={0} mr={{ base: 2, md: -32 }} w={'100%'} alignItems={'center'} justifyContent={'center'} display={'flex'} color={'white'} textTransform={'uppercase'}
            fontFamily={'sans-serif'} fontWeight={'bold'} >
            <Text fontSize={{ base: 14, md: 16 }}>Chatbot</Text>
            <Icon mt={{ md: -1 }} fontSize={{ base: 22, md: 30 }} as={GoDependabot}/>
            <Text fontSize={{ base: 14, md: 16 }}>Mais Valor</Text>
          </Box>
        </Flex>

        <InteracaoChat />

      </Box>
    </ChakraProvider>
  )
}
