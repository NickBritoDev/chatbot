import React from 'react'

import { Box, Skeleton, SkeletonCircle } from '@chakra-ui/react'

function SkeletonMessagensChat () {
  return (
    <>
      <Box width={'100%'} alignItems={'flex-start'} justifyContent={'flex-start'}>
        <Box padding='6' bg='white'>
          <SkeletonCircle size='10' />
          <Skeleton height='3px' mt={2} />
          <Skeleton height='3px' mt={2} />
          <Skeleton height='3px' mt={2} />
        </Box>
        <Box padding='6' bg='white'>
          <SkeletonCircle size='10' />
          <Skeleton height='3px' mt={2} />
          <Skeleton height='3px' mt={2} />
          <Skeleton height='3px' mt={2} />
        </Box>
      </Box>

      <Box width={'100%'} alignItems={'flex-end'} justifyContent={'flex-end'}>
        <Box padding='6' bg='white'>
          <SkeletonCircle size='10' />
          <Skeleton height='3px' mt={2} />
          <Skeleton height='3px' mt={2} />
          <Skeleton height='3px' mt={2} />
        </Box>
        <Box padding='6' bg='white'>
          <SkeletonCircle size='10' />
          <Skeleton height='3px' mt={2} />
          <Skeleton height='3px' mt={2} />
          <Skeleton height='3px' mt={2} />
        </Box>
      </Box>

      <Box width={'100%'} alignItems={'flex-start'} justifyContent={'flex-start'}>
        <Box padding='6' bg='white'>
          <SkeletonCircle size='10' />
          <Skeleton height='3px' mt={2} />
          <Skeleton height='3px' mt={2} />
          <Skeleton height='3px' mt={2} />
        </Box>
        <Box padding='6' bg='white'>
          <SkeletonCircle size='10' />
          <Skeleton height='3px' mt={2} />
          <Skeleton height='3px' mt={2} />
          <Skeleton height='3px' mt={2} />
        </Box>
      </Box>

      <Box width={'100%'} alignItems={'flex-end'} justifyContent={'flex-end'}>
        <Box padding='6' bg='white'>
          <SkeletonCircle size='10' />
          <Skeleton height='3px' mt={2} />
          <Skeleton height='3px' mt={2} />
          <Skeleton height='3px' mt={2} />
        </Box>
        <Box padding='6' bg='white'>
          <SkeletonCircle size='10' />
          <Skeleton height='3px' mt={2} />
          <Skeleton height='3px' mt={2} />
          <Skeleton height='3px' mt={2} />
        </Box>
      </Box>
    </>
  )
}

export default SkeletonMessagensChat
