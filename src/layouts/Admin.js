/* eslint-disable react/prop-types */
/* eslint-disable array-callback-return */
import React from 'react'
import { BsFillGearFill } from 'react-icons/bs'
import { FcCustomerSupport, FcFlowChart, FcHome, FcLineChart, FcTodoList, FcViewDetails } from 'react-icons/fc'
import {
  FiMenu,
  FiBox
} from 'react-icons/fi'
import { GiHamburgerMenu } from 'react-icons/gi'
import { useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'

import { ChevronDownIcon } from '@chakra-ui/icons'
import {
  IconButton,
  Avatar,
  Box,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  Image,
  MenuList,
  DrawerOverlay,
  DrawerHeader,
  DrawerBody,
  Button,
  ChakraProvider, CSSReset, theme
} from '@chakra-ui/react'

import logo from '../assets/logocolorido.png'
import ToggleMode from './components/ToggleMode'

export default function AdminLayout ({ children }) {
  const navigate = useNavigate()
  const { perfil, features } = useSelector((state) => state.perfil)
  const { isOpen, onOpen, onClose } = useDisclosure()

  function verifyUseFeature (keyFeature, features) {
    if (features === undefined) return

    return features.includes(keyFeature)
  }

  const setLocalStorage = () => {
    const mes = new Date().getMonth() + 1
    const ano = new Date().getFullYear()
    const dataInicial = `${ano}-${mes}-01`
    const dataFinal = new Date().toISOString().split('T')[0]
    localStorage.setItem('dataInicial', dataInicial)
    localStorage.setItem('dataFinal', dataFinal)
  }

  const LinkHomeSystem = [
    {
      name: features.includes('modulo_rh') ? 'Home RH' : 'Home Chatbot',
      icon: FcHome,
      show: true,
      link: '/admin/home'
    }

  ]

  const LinkItemsSubMenuRh = [
    {
      name: 'Recursos Humanos',
      icon: FiBox,
      show: verifyUseFeature('modulo_rh', features),
      subButton: [
        {
          name: 'Gerenciamento',
          icon: BsFillGearFill,
          show: verifyUseFeature('modulo_rh', features),
          subMenu: [
            {
              link: '/admin/rh/gerenciamento/campanhas',
              nome: 'Gerenciamento de Campanhas',
              icon: FcLineChart
            }
          ]
        },
        {
          name: 'Painel de Importação',
          icon: BsFillGearFill,
          show: verifyUseFeature('modulo_rh', features),
          subMenu: [
            {
              link: '/admin/rh/painel/campanhas',
              nome: 'Importador de Campanhas',
              icon: FcTodoList
            }
          ]
        }
      ]
    }

  ]

  const LinkItemsSubMenu = [
    {
      name: 'Painel de Atendimento',
      icon: FiBox,
      show: verifyUseFeature('modulo_atendimento', features),
      subMenu: [
        {
          link: '/admin/atendimento',
          nome: 'Atendimento',
          icon: FcCustomerSupport
        },
        {
          link: '/admin/historicoAtendimento',
          nome: 'Historico de atendimento',
          icon: FcViewDetails
        }
      ],
      subButton: [
        {
          name: 'Relatórios',
          icon: BsFillGearFill,
          show: verifyUseFeature('feat_dashboard_painel_de_atendimento', features),
          subMenu: [
            {
              link: '/admin/relatorio',
              nome: 'Relatórios de Trilhas',
              icon: FcFlowChart
            },
            {
              link: '/admin/tabulacao',
              nome: 'Tabulação X Trilhas',
              icon: FcTodoList
            }
          ]
        },
        {
          name: 'Gráficos',
          icon: BsFillGearFill,
          show: verifyUseFeature('feat_dashboard_painel_de_atendimento', features),
          subMenu: [
            {
              link: '/admin/grafico',
              nome: 'Gráficos de Trilhas',
              icon: FcLineChart
            }
          ]
        },
        {
          name: 'Gerenciamento',
          icon: BsFillGearFill,
          show: verifyUseFeature('feat_gerenciamento_chatbot_trilha', features),
          subMenu: [
            {
              link: '/admin/gerenciamento',
              nome: 'Gerenciamento de Trilhas',
              icon: FcTodoList
            }
          ]
        }
      ]
    }

  ]

  function SidebarContent () {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [placement] = React.useState('left')

    return (
      <>
        <Button pos={'absolute'} top={2} left={5} colorScheme='gray' onClick={onOpen}>
          <Icon as={GiHamburgerMenu} />
        </Button>
        <Drawer placement={placement} onClose={onClose} isOpen={isOpen}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerHeader borderBottomWidth='1px'>
              <Image src={logo} alt='Logo Empresa' />
            </DrawerHeader>
            <DrawerBody display={'flex'} flexDir={'column'} gap={4} >
              {LinkHomeSystem.map((link, index) => {
                if (link.show) {
                  return (
                    <Button key={index} display={'flex'} justifyContent={'space-between'} alignItems={'center'} textAlign={'left'} w={'100%'} onClick={() => {
                      setLocalStorage()
                      navigate(link.link)
                    }}>
                      {link.name}
                      <Icon as={link.icon} />
                    </Button>
                  )
                }
              })}
              {LinkItemsSubMenu.map((link) => {
                if (link.show) {
                  return (
                    <Menu key={link.name}>
                      <MenuButton textAlign={'left'} w={'270px'} as={Button} rightIcon={<ChevronDownIcon />}>
                        {link.name}
                      </MenuButton>
                      <MenuList w={'270px'} >
                        {link.subMenu.map((subMenuItem) => (
                          <MenuItem w={'270px'} display={'flex'} alignItems={'center'} justifyContent={'space-between'} key={subMenuItem.link} onClick={() => {
                            setLocalStorage()
                            navigate(subMenuItem.link)
                          }} >
                            {subMenuItem.nome}
                            <Icon as={subMenuItem?.icon} />
                          </MenuItem>
                        ))}

                        {link.subButton.map((subButton, index) => (
                          subButton.show &&
                          <Flex key={index} mt={2} flexDir={'column'}>
                            <Menu key={link.name}>
                              <MenuButton textAlign={'left'} w={'270px'} as={Button} rightIcon={<ChevronDownIcon />}>
                                {subButton.name}
                              </MenuButton>
                              <MenuList>
                                {subButton.subMenu.map((subMenu) => (
                                  <MenuItem onClick={() => navigate(subMenu.link)} w={'270px'} display={'flex'} alignItems={'center'} justifyContent={'space-between'} key={subMenu.nome}>
                                    {subMenu?.nome}
                                    <Icon as={subMenu?.icon} />
                                  </MenuItem>
                                ))}
                              </MenuList>
                            </Menu>
                          </Flex>
                        ))}

                      </MenuList>
                    </Menu>
                  )
                }
              })}
              {LinkItemsSubMenuRh.map((link, index) => {
                if (link.show) {
                  return (
                    <Menu key={index}>
                      <MenuButton textAlign={'left'} w={'270px'} as={Button} rightIcon={<ChevronDownIcon />}>
                        {link.name}
                      </MenuButton>
                      <MenuList w={'270px'} >
                        {link.subButton.map((subButton, index) => (
                          <Flex key={index} mt={2} flexDir={'column'}>
                            <Menu key={link.name}>
                              <MenuButton textAlign={'left'} w={'270px'} as={Button} rightIcon={<ChevronDownIcon />}>
                                {subButton.name}
                              </MenuButton>
                              <MenuList w={'270px'}>
                                {subButton.subMenu.map((subMenu) => (
                                  <MenuItem onClick={() => navigate(subMenu.link)} w={'270px'} display={'flex'} alignItems={'center'} justifyContent={'space-between'} key={subMenu.nome}>
                                    {subMenu?.nome}
                                    <Icon as={subMenu?.icon} />
                                  </MenuItem>
                                ))}
                              </MenuList>
                            </Menu>
                          </Flex>
                        ))}
                      </MenuList>
                    </Menu>
                  )
                }
              })}
            </DrawerBody>
            <ToggleMode />
          </DrawerContent>
        </Drawer>
      </>
    )
  }

  const MobileNav = ({ onOpen, ...rest }) => {
    return (
      <Flex
        px={{ base: 4, md: 4 }}
        height='14'
        alignItems='center'
        bg={useColorModeValue('white', 'gray.600')}
        borderBottomWidth='1px'
        borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
        justifyContent={'space-between'}
        {...rest}>
        <IconButton
          display={{ base: 'none', md: 'none' }}
          onClick={onOpen}
          variant='outline'
          aria-label='open menu'
          icon={<FiMenu />}
        />

        <Image ml={'16'} w={250} src={logo} alt='Logo Empresa' />

        <Text
          display={{ base: 'flex', md: 'none' }}
          fontSize='2xl'
          fontFamily='monospace'
          fontWeight='bold'>
        </Text>

        <HStack mr={6} spacing={{ base: '0', md: '6' }}>
          <Flex alignItems={'center'}>
            <Menu>
              <MenuButton
                py={2}
                transition='all 0.3s'
                _focus={{ boxShadow: 'none' }}>
                <HStack>
                  <Avatar
                    size={'sm'}
                    src={perfil.foto}
                  />
                  <VStack
                    display={{ base: 'none', md: 'flex' }}
                    alignItems='flex-start'
                    spacing='1px'>
                    <Text fontSize='sm'>{perfil.nome} </Text>
                    <Text textTransform={'uppercase'} fontSize='xs'>
                      {perfil.perfil}
                    </Text>
                  </VStack>
                </HStack>
              </MenuButton>
              <MenuList
                zIndex={99}
                w={'320px'}
                bg={useColorModeValue('white', 'gray.900')}
                borderColor={useColorModeValue('gray.200', 'gray.700')}>
                <MenuItem display={'none'}>Configurações</MenuItem>
                <MenuDivider />
                <a href='https://www.portalmaisvalor.com/paginas/login.html' rel='noopener noreferrer'>
                  <MenuItem >Sair</MenuItem>
                </a>
              </MenuList>
            </Menu>
          </Flex>
        </HStack>
      </Flex>
    )
  }

  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <Box >
        <SidebarContent
          onClose={() => onClose}
          display={'none'}
        />
        <Drawer
          isOpen={isOpen}
          placement='left'
          onClose={onClose}
          returnFocusOnClose={false}
          onOverlayClick={onClose}>
          <DrawerContent>
            <SidebarContent onClose={onClose} />
          </DrawerContent>
        </Drawer>
        {/* mobilenav */}
        <MobileNav onOpen={onOpen} />
        <Box bg={'gray.200'} minH={'80vh'} borderRadius='2' >
          <Outlet />
        </Box>
      </Box>
    </ChakraProvider>
  )
}
