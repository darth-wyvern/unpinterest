import React, { useEffect } from "react";
import ImageManagement from "../image-management/ImageManagement";
import AppHeader from "./AppHeader";
import { Box, Button, Flex } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  getImages,
  changePage,
  querySearch,
} from "../image-management/imageSlice";
import AppPagintion from "./AppPagintion";
import { createSearchParams, Outlet, useSearchParams } from "react-router-dom";

export default function DefaultLayout() {
  const dispatch = useDispatch();
  const { data, page } = useSelector((state) => state.image);
  const [searchParams, setSearchParams] = useSearchParams();

  const _page = searchParams.get("page");
  const _query = searchParams.get("query");

  useEffect(() => {
    if (!_page && !_query) {
      createSearchParams(
        setSearchParams({
          query: "cat",
          page: 1,
        })
      );
      dispatch(
        getImages({
          query: "cat",
          page: {
            number: 1,
            perPage: 30,
          },
        })
      );
    } else {
      dispatch(
        getImages({
          query: _query,
          page: {
            number: _page,
            perPage: 30,
          },
        })
      );
      dispatch(querySearch(_query));
    }
  }, [_query, _page, dispatch, setSearchParams]);

  useEffect(() => {
    dispatch(changePage(_page));
  }, [_page, dispatch]);

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
              <AppPagintion total={page.totalPage} defaultCurrent={_page} />
            </Box>
          </Flex>
        </Box>
      )}
      <Outlet />
    </Box>
  );
}
