/* eslint-disable react/no-children-prop */
/* eslint-disable react/prop-types */
import React, { useRef, useState } from 'react'
import { useSelector } from 'react-redux'

import { CheckIcon } from '@chakra-ui/icons'
import {
  AlertDialog, AlertDialogBody,
  AlertDialogCloseButton, AlertDialogContent,
  AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay,
  Button, Input, InputGroup, InputLeftElement, InputRightElement,
  Stack
} from '@chakra-ui/react'

import { useNovaTrilha } from '../hooks/useEnviarNovaTrilha'

const DialogAbrirOutros = ({ onClose, onTrilhaCreated }) => {
  const search = window.location.search
  const params = new URLSearchParams(search)
  const codePage = params.get('codePage')
  const { UseRequestEnviarNovaTrilha, isLoading } = useNovaTrilha()
  const { informacao } = useSelector((state) => state.blocoInformacaoAtendimento)
  const [trilhaInput, setTrilhaInput] = useState('')

  const handleCriarClick = () => {
    if (trilhaInput) {
      onTrilhaCreated(trilhaInput)
      onClose()
    }
  }

  const enviarNovaTrilha = () => {
    UseRequestEnviarNovaTrilha(
      {
        idDepartamento: 3,
        codePage,
        idProtocolo: informacao.idProtocolo,
        nome: trilhaInput
      }
    )
  }

  const handleInputChange = (event) => {
    const inputValue = event.target.value
    const words = inputValue.trim().split(' ')
    if (inputValue.length <= 50 && words.length <= 5) {
      setTrilhaInput(inputValue)
    }
  }

  const cancelRef = useRef(null)

  return (
    <>
      <AlertDialog
        motionPreset='slideInBottom'
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={true}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Criar um trilha especifica ?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody color={'black'}>
            Ao criar uma trilha especifica ela fica disponivel apenas durante o seu atendimento.
          </AlertDialogBody>
          <AlertDialogBody>
            Digite abaixo o seu problema de forma resumida
            <Stack mt={2} spacing={4}>
              <InputGroup>
                <InputLeftElement
                  pointerEvents='none'
                  color='gray.300'
                  fontSize='1.2em'
                  children='#'
                />
                <Input
                  placeholder='#SuaNovaTrilha'
                  value={trilhaInput}
                  onChange={handleInputChange}
                />
                <InputRightElement>
                  <CheckIcon color='green.500' />
                </InputRightElement>
              </InputGroup>
            </Stack>
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef } onClick={onClose}>
              Cancelar
            </Button>
            <Button
              colorScheme='green' ml={3} onClick={() => { handleCriarClick(); enviarNovaTrilha() }}>
              {!isLoading ? 'Criar' : 'Criando'}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export default DialogAbrirOutros
