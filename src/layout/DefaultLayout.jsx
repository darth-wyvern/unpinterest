import React, { useEffect } from "react";
import ImageManagement from "../image-management/ImageManagement";
import AppHeader from "./AppHeader";
import { Box, Button, Flex } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { getImages } from "../image-management/imageSlice";
import AppPagintion from "./AppPagintion";
import { Outlet } from "react-router-dom";

export default function DefaultLayout() {
  const dispatch = useDispatch();
  const { query, page } = useSelector((state) => state.image);

  useEffect(() => {
    dispatch(getImages({ query, page }));
  }, [dispatch, page, query]);

  return (
    <Box className="App" p={3}>
      <Button fontSize='small' onClick={() => {
        window.sessionStorage.setItem("key", "value");
      }}>check signin</Button>
      <Box pos="fixed" top={0} zIndex={2}>/
        <AppHeader />
      </Box>
      <Box>
        <ImageManagement />
        <Flex
          justifyContent="center"
          pos="fixed"
          right={0}
          left={0}
          bottom={0}
          p={4}
          zIndex={2}
          bg="#0006"
          opacity="0.7"
          transition=".2s"
          _hover={{ opacity: 1 }}
        >
          <Box className="app-pagination">
            <AppPagintion
              total={page.totalPage}
              defaultCurrent={2}
            />
          </Box>
        </Flex>
      </Box>
      <Outlet />
    </Box>
  );
}
