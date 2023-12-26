/* eslint-disable react/prop-types */
import React from 'react'
import { MdReport } from 'react-icons/md'

import {
  Table, Alert, AlertIcon,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer
} from '@chakra-ui/react'

export default function InformacaoResposta ({ resposta, pergunta }) {
  const linhasResposta = resposta.map((res, index) => (
    <Tr key={index}>
      <Td whiteSpace='pre-wrap'> <MdReport size={21}/>  {res.toString().replaceAll('\n', '\n')}</Td>
    </Tr>
  ))
  return (
    <TableContainer fontSize='xs'>
      <Table variant='simple' mt={2} colorScheme='whatsapp' size='sm'>
        <TableCaption>Resultados ({resposta.length})</TableCaption>
        <Thead>
          <Tr>
            <Th><h3>{pergunta}</h3></Th>
          </Tr>
        </Thead>
        <Tbody>
          {linhasResposta}
        </Tbody>
      </Table>
      <Alert status='info'>
        <AlertIcon />
        Essa informação do chat tem duração de 24hrs
      </Alert>
    </TableContainer>
  )
}
