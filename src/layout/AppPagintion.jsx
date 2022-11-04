import React from "react";
import { Box, Button, Flex } from "@chakra-ui/react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
} from "@chakra-ui/icons";

export default function AppPagintion({ total, prev, next, currentPage, gotoPage, jumpPrev, jumpNext, listNode }) {
  return (
    <Flex gap={2} flexWrap="wrap" borderRadius="1rem">
      <Button onClick={() => prev()} w="1rem">
        <ChevronLeftIcon boxSize={6} _hover={{ color: "blue.300" }} />
      </Button>
      {currentPage > 3 && (
        <Button w="1rem" onClick={() => gotoPage(1)}>1</Button>
      )}
      {currentPage > 3 && (
        <Button
          onClick={() => jumpPrev()}
          w="1rem"
          _hover={{
            ".icon": { display: "block" },
            ".jumpPrev": { display: "none" },
          }}
        >
          <ArrowLeftIcon
            boxSize={2}
            className="icon"
            display="none"
            color="blue.300"
          />
          <Box className="jumpPrev">...</Box>
        </Button>
      )}
      {listNode?.map((item) => (
        <Button key={item}
          colorScheme={item === currentPage ? "blue" : "gray"}
          onClick={() => gotoPage(item)}
        >
          {item}
        </Button>
      ))}
      {currentPage < total - 3 && (
        <Button
          onClick={() => jumpNext()}
          w="1rem"
          _hover={{
            ".icon": { display: "block" },
            ".jumpNext": { display: "none" },
          }}
        >
          <ArrowRightIcon
            boxSize={2}
            className="icon"
            display="none"
            color="blue.300"
          />
          <Box className="jumpNext">...</Box>
        </Button>
      )}
      {currentPage < total - 2 && (
        <Button w="1rem" onClick={() => gotoPage(total)}>{total}
        </Button>
      )}
      <Button onClick={() => next()} w="1rem"><ChevronRightIcon _hover={{ color: "blue.300" }} />
      </Button>
    </Flex>
  );
}
