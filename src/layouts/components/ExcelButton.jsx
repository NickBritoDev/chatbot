import { Button } from '@chakra-ui/react'
import React from 'react'
import PropTypes from 'prop-types'
import exportToExcel from '../../helpers/excel/excelExport'
import { RiFileExcel2Line } from 'react-icons/ri'

function ExcelButton ({ data, name }) {
  return (
    <Button
      _hover={{ color: 'green', bg: 'white' }}
      gap={1}
      bg={'green.600'}
      color={'white'}
      mr={2}
      onClick={() => { exportToExcel(data, name) }}>
      Exportar Excel <RiFileExcel2Line fontSize={'24'} />
    </Button>
  )
}

ExcelButton.propTypes = {
  data: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired
}

export default ExcelButton
