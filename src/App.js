import React, { useEffect } from 'react';
import ImageManagement from './image-management/ImageManagement';
import AppHeader from './layout/AppHeader';
import { Box } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { getImages, changePage } from './image-management/imageSlice';
import './App.css'
import AppPagination from './layout/AppPagination';
import usePagination from './common/usePagination';

function App() {
  const dispatch = useDispatch()
  const { query, page } = useSelector(state => state.image)
  const { currentPage, gotoPage, listNode, prev, next } = usePagination(page.totalPage)

  useEffect(() => {
    dispatch(getImages({ query, page }))
    gotoPage(page.number)
  }, [dispatch, gotoPage, page, query])

  useEffect(() => {
    gotoPage(page.number)
  }, [gotoPage, page.number])

  useEffect(() => {
    dispatch(changePage(currentPage))
  }, [currentPage, dispatch])


  return (
    <Box className="App" p={3}>
      <Box pos='fixed' top={0} zIndex={2}>
        <AppHeader />
      </Box>
      <Box >
        <ImageManagement />
        <Box pos='fixed' right={0} left={0} bottom={0} p={4} zIndex={2} bg='#0006' opacity='0.7' transition='.2s' _hover={{ opacity: 1 }}>
          <AppPagination currentPage={currentPage} listNode={listNode} gotoPage={gotoPage} prev={prev} next={next} />
        </Box>
      </Box>
    </Box>
  );
}

export default App;
