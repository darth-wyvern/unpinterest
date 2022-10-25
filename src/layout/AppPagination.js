import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Button, Flex } from "@chakra-ui/react";

export default function AppPagination({ currentPage, listNode, prev, next, gotoPage }) {
  const cursorPointer = { cursor: 'pointer' };

  return (
    <Flex gap={3} justifyContent='center' >
      <Button
        onClick={prev}
        style={cursorPointer}
      >
        <ChevronLeftIcon />
      </Button>
      {listNode.map((item) => (
        <Button
          key={item}
          colorScheme={(currentPage === item) ? 'blue' : 'gray'}
          onClick={() => gotoPage(item)}
          sx={cursorPointer}
          _hover={{
            transition: '.1s',
            transform: 'scale(1.4)'
          }}
        >
          {item}
        </Button>
      ))}
      <Button
        onClick={next}
        style={cursorPointer}
      >
        <ChevronRightIcon />
      </Button>
    </Flex>
  );
}