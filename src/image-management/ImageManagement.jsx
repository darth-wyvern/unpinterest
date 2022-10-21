import React from 'react';
import { Box, Link, Spinner, Image, Flex } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import AppPagination from '../layout/AppPagination';
import './style.css'

function CardImage({ data }) {
  return (
    <Box pt={2}>
      <Link href={data.links.html}>
        <Image style={{
          width: '100%',
          height: '100%',
          borderRadius: '1rem'
        }} src={data.urls.regular} alt="" />
      </Link>
      <Flex alignItems='center' fontSize='small'>
        <Box p={2}>{data.user.username}</Box>
      </Flex>
    </Box>
  )
}

export default function ImageManagement() {
  const { data, loading } = useSelector(state => state.image)

  return (
    <Box p='2rem'>
      {
        (loading) ?
          <Box textAlign='center' m={3}>
            <Spinner />
          </Box>
          :
          <Box>
            <Box className='card-container' columnGap={3} p={1}>
              {
                data.map((i) => <Box key={i.id}
                  display='inline-block'
                  w='100%'
                  mt={5}
                >
                  <CardImage data={i} />
                </Box>)
              }
            </Box>
            <AppPagination />
          </Box>
      }
    </Box>
  )
}