import React, { useEffect } from "react";
import { Box, Button, Flex } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useSearchParams } from "react-router-dom";
import { getImages, setPage, setQuery } from "../image-management/imageSlice";
import AppHeader from "./AppHeader";
import AppPagintion from "./AppPagintion";
import usePagination from "../common/usePagination";
import ImageManagement from "../image-management/ImageManagement";

export default function DefaultLayout() {
  const dispatch = useDispatch();
  const { query, page, data, totalPage } = useSelector((state) => state.image);

  const [searchParams, setSearchParams] = useSearchParams();
  const _page = searchParams.get("page");
  const _query = searchParams.get("query");

  const { prev, next, currentPage, gotoPage, jumpPrev, jumpNext, listNode } =
    usePagination({ totalPage: totalPage, current: _page });

  useEffect(() => {
    setSearchParams({
      query: _query,
      page: currentPage,
    });
    dispatch(setPage(currentPage));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  useEffect(() => {
    if (!_page && !_query) {
      setSearchParams({
        query: query,
        page: page,
      });
      gotoPage(page | 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (_query && _page) {
      if (_query !== query || _page !== page) {
        dispatch(
          getImages({
            query: _query,
            page: _page,
          })
        );
      }
      dispatch(setQuery(_query));
      dispatch(setPage(_page));
    } else {
      setSearchParams({
        query: query,
        page: page,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams.toString()]);

  return (
    <Box className="App" pt={3} p="1rem">
      <Button
        fontSize="small"
        onClick={() => {
          window.sessionStorage.setItem("key", "value");
        }}
      >
        check signin
      </Button>
      <Box pos="fixed" top={0} zIndex={2}>
        <AppHeader />
      </Box>
      {data && (
        <Box>
          <ImageManagement />
          <Flex
            justifyContent="center"
            pos="fixed"
            right={0}
            left={0}
            bottom={0}
            p={2}
            zIndex={2}
            bg="#0006"
            opacity="0.7"
            transition=".2s"
            borderRadius="1rem"
            m={2}
            _hover={{ opacity: 1 }}
          >
            <Box className="app-pagination">
              {_page && (
                <AppPagintion
                  total={totalPage}
                  prev={prev}
                  next={next}
                  currentPage={currentPage}
                  gotoPage={gotoPage}
                  jumpPrev={jumpPrev}
                  jumpNext={jumpNext}
                  listNode={listNode}
                />
              )}
            </Box>
          </Flex>
        </Box>
      )}
      <Outlet />
    </Box>
  );
}
