import React from 'react'

import { SkeletonCircle, Box } from '@chakra-ui/react'

export default function Loading () {
  return (
    <>
      <Box padding='6' boxShadow='lg' bg='white'>
        <SkeletonCircle size='10' />
      </Box>
    </>
  )
}
