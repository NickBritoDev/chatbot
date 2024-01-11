/* eslint-disable react/prop-types */
import React from 'react'
import { FiMenu, FiChevronDown } from 'react-icons/fi'

import {
  IconButton, SkeletonCircle, Stack, Skeleton,
  Box,
  Flex,
  HStack,
  VStack,
  useColorModeValue,
  Drawer,
  DrawerContent,
  Text,
  Menu,
  MenuButton
} from '@chakra-ui/react'

export default function LoadingPageFull () {
  const SidebarContent = ({ onClose, ...rest }) => {
    return (
      <Box
        transition='3s ease'
        bg={useColorModeValue('white', 'gray.900')}
        borderRight='1px'
        borderRightColor={useColorModeValue('gray.200', 'gray.700')}
        w={{ base: 'full', md: 60 }}
        pos='fixed'
        h='full'
        {...rest}>
        <Box padding='6' boxShadow='lg' bg='white'>
          <SkeletonCircle size='10' />
        </Box>
        <Box padding='6' boxShadow='lg' bg='white'>
        </Box>
      </Box>
    )
  }

  const MobileNav = ({ onOpen, ...rest }) => {
    return (
      <Flex
        ml={{ base: 0, md: 60 }}
        px={{ base: 4, md: 4 }}
        height='20'
        alignItems='center'
        bg={useColorModeValue('white', 'gray.900')}
        borderBottomWidth='1px'
        borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
        justifyContent={{ base: 'space-between', md: 'flex-end' }}
        {...rest}>
        <IconButton
          display={{ base: 'flex', md: 'none' }}
          onClick={onOpen}
          variant='outline'
          aria-label='open menu'
          icon={<FiMenu />}
        />

        <Text
          display={{ base: 'flex', md: 'none' }}
          fontSize='2xl'
          fontFamily='monospace'
          fontWeight='bold'>
          Logo
        </Text>

        <HStack spacing={{ base: '0', md: '6' }}>
          <Flex alignItems={'center'}>
            <Menu>
              <MenuButton
                py={2}
                transition='all 0.3s'
                _focus={{ boxShadow: 'none' }}>
                <HStack>
                  <SkeletonCircle size='10' />
                  <VStack
                    display={{ base: 'none', md: 'flex' }}
                    alignItems='flex-start'
                    spacing='1px'
                    ml='2'>
                    <Text fontSize='sm'>
                      <Skeleton height='20px' w={'90px'} />
                    </Text>
                    <Text fontSize='xs' color='gray.600'>
                      <Skeleton height='20px'w={'80'} />
                    </Text>
                  </VStack>
                  <Box display={{ base: 'none', md: 'flex' }}>
                    <FiChevronDown />
                  </Box>
                </HStack>
              </MenuButton>
            </Menu>
          </Flex>
        </HStack>
      </Flex>
    )
  }
  return (

    <Box minH='100vh' bg={useColorModeValue('gray.100', 'gray.900')}>
      <SidebarContent
        display={{ base: 'none', md: 'block' }}
      />
      <Drawer
        placement='left'
        returnFocusOnClose={false}
        size='full'>
        <DrawerContent>
          <SidebarContent />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav />
      <Box ml={{ base: 0, md: 60 }} p='4' bg={'gray.200'} minH={'100vh'} borderRadius='2' m={1}>
        <Stack>
          <Box padding='6' boxShadow='lg' bg='white'>
            <SkeletonCircle size='10' />
          </Box>
        </Stack>
      </Box>
    </Box>
  )
}
