import React, { useState } from "react";
import {
  Box,
  CloseButton,
  Flex,
  IconButton,
  Image,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { setImageChoosing } from "../image-management/imageSlice";

export default function AppLightBox() {
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const { data, imageChoosing } = useSelector((state) => state.image);

  const [tabIndex, setTabIndex] = useState(imageChoosing | 0);

  const handleTabsChange = (index) => {
    setTabIndex(index);
    dispatch(setImageChoosing(index));
  };

  return (
    <Box
      pos="fixed"
      zIndex={999}
      inset={0}
      h="100vh"
      w="100vw"
      bg="#000"
      color="white"
    >
      <CloseButton pos="fixed" right={0} onClick={() => navigator("/")} />
      {tabIndex > 0 && (
        <IconButton
          aria-label="Search database"
          icon={<ChevronLeftIcon />}
          pos="fixed"
          top="50%"
          transform="translateY(-50%)"
          bg="#0000"
          color="white"
          fontSize="25pt"
          _hover={{
            bg: "#fff1",
          }}
          _active={{
            bg: "#fff3",
          }}
          onClick={() => {
            if (tabIndex > 0) {
              setTabIndex(tabIndex - 1);
            }
          }}
        />
      )}

      {tabIndex < data.length - 1 && (
        <IconButton
          aria-label="Search database"
          icon={<ChevronRightIcon />}
          pos="fixed"
          right={0}
          top="50%"
          transform="translateY(-50%)"
          bg="#0000"
          color="white"
          fontSize="25pt"
          _hover={{
            bg: "#fff1",
          }}
          _active={{
            bg: "#fff3",
          }}
          onClick={() => {
            if (tabIndex < data.length - 1) {
              setTabIndex(tabIndex + 1);
            }
          }}
        />
      )}
      <Tabs index={tabIndex} onChange={handleTabsChange}>
        <TabPanels>
          {data?.map((i) => (
            <TabPanel key={JSON.stringify(i)}>
              <Box w="100%" h="calc(100vh - 150px)" overflow="hidden">
                <Image
                  src={i.urls.full}
                  w="100%"
                  h="100%"
                  objectFit="contain"
                  loading="eager"
                />
              </Box>
            </TabPanel>
          ))}
        </TabPanels>
        <TabList display="flex" pos="fixed" bottom={0} left={0} right={0}>
          <Flex overflowY="hidden" overflowX="auto" m={5}>
            {data?.map((i, index) => (
              <Tab
                p={0}
                key={JSON.stringify(i)}
                opacity={index !== tabIndex ? "0.3" : "1"}
              >
                <Box w="120px" h="70px" overflow="hidden">
                  <Image
                    src={i.urls.regular}
                    w="100%"
                    h="100%"
                    objectFit="cover"
                  />
                </Box>
              </Tab>
            ))}
          </Flex>
        </TabList>
      </Tabs>
    </Box>
  );
}
