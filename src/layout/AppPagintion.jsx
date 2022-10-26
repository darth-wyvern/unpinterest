import React, { useEffect } from "react";
import { Button, Flex } from "@chakra-ui/react";
import usePagination from "../common/usePagination";
import { changePage } from "../image-management/imageSlice";
import { useDispatch, useSelector } from "react-redux";

export default function AppPagintion({ defaultCurrent, total }) {
  const {
    prev,
    next,
    currentPage,
    gotoPage,
    minNodePage,
    maxNodePage } = usePagination({ totalPage: total, current: defaultCurrent });

  // create array pagination nodes
  const listNode = Array.apply(null, Array(maxNodePage - minNodePage + 1)).map(
    function (_, i) {
      return i + minNodePage;
    }
  );

  const dispatch = useDispatch()
  const { query } = useSelector((state) => state.image);

  useEffect(() => {
    dispatch(changePage(currentPage))
  }, [currentPage, dispatch])

  useEffect(() => {
    dispatch(changePage(1))
    gotoPage(1)
  }, [dispatch, gotoPage, query])

  return (
    <Flex gap={2}>
      <Button onClick={() => prev()}>prev</Button>
      {listNode?.map((item) => (
        <Button
          key={item}
          colorScheme={item === currentPage ? "blue" : "gray"}
          onClick={() => gotoPage(item)}
        >
          {item}
        </Button>
      ))}
      <Button onClick={() => next()}>next</Button>
    </Flex>
  );
}
