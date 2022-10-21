import { Box, Button, Flex } from "@chakra-ui/react"
import { useDispatch, useSelector } from "react-redux"
import { prevPage, nextPage } from '../image-management/imageSlice'

export default function AppPagination() {
  const dispatch = useDispatch()
  const { page } = useSelector(state => state.image)

  return (
    <Box>
      <Box>
        <Flex gap={3} justifyContent='center' >
          <Button onClick={() => dispatch(prevPage())} fontSize='small'>prev</Button>
          <Button colorScheme='teal' variant='ghost' fontSize='small'>{page.number} of {page.totalPage}</Button>
          <Button onClick={() => dispatch(nextPage())} fontSize='small'>next</Button>
        </Flex>
      </Box>
    </Box>)
}