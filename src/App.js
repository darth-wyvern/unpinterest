import React, { useEffect } from 'react';
import ImageManagement from './image-management/ImageManagement';
import AppHeader from './layout/AppHeader';
import { Box } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { getImages } from './image-management/imageSlice';
import './App.css'

function App() {
  const dispatch = useDispatch()

  const { query, page } = useSelector(state => state.image)

  useEffect(() => {
    dispatch(getImages({ query, page }))
  }, [dispatch, page, query])

  return (
    <Box className="App" p={3}>
      <AppHeader />
      <Box pt='2rem'>
        <ImageManagement />
      </Box>
    </Box>
  );
}

export default App;
