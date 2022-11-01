import React, { useState } from "react";
import {
  Badge,
  Box,
  Button,
  Image,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  CircularProgress,
} from "@chakra-ui/react";
import Login from "./Login";
import { Link, useNavigate } from "react-router-dom";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useSelector } from "react-redux";

export default function LoginCheckToast() {
  const navigator = useNavigate();
  const { toastSignin } = useSelector((state) => state.auth);
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <Box
      bg={{ base: "white", sm: "#0007" }}
      position="fixed"
      inset={0}
      overflow="auto"
      zIndex={999}
    >
      <Tabs index={tabIndex}>
        <TabPanels>
          <TabPanel>
            <Login nextStep={() => setTabIndex(tabIndex + 1)} />
          </TabPanel>
          <TabPanel
            bg="#fff"
            pos="fixed"
            borderRadius="1rem"
            left="50%"
            top="50%"
            transform="translate(-50%, -50%)"
            w="100%"
            maxW="480px"
            textAlign="center"
          >
            {toastSignin ? (
              <Box pos="relative" p="40px">
                {toastSignin.message ? (
                  <Box>
                    <Image
                      w="5vw"
                      minW="3rem"
                      m="auto"
                      src="https://cdn3.iconfinder.com/data/icons/simple-web-navigation/165/cross-512.png"
                      alt=""
                    />
                    <Box color="red" fontSize="small" mt={4}>
                      {toastSignin.message}
                    </Box>
                    <Badge
                      colorScheme="red"
                      p=".3rem .5rem"
                      whiteSpace="pre-line"
                    >
                      Login failed! please try again laters
                    </Badge>
                    <Link to="signin">
                      <Button
                        colorScheme="facebook"
                        mt={6}
                        mb={3}
                        onClick={() => navigator(-1)}
                      >
                        Login again
                      </Button>
                    </Link>
                    <br />
                    <Box as={Link} to="/" fontSize="small" textAlign="center">
                      <ArrowBackIcon />
                      back to home
                    </Box>
                  </Box>
                ) : (
                  <Box>
                    <Image
                      w="5vw"
                      minW="3rem"
                      m="auto"
                      src="http://www.clearsteps.com/wordpress/wp-content/uploads/2017/12/Green-Check.png"
                      alt=""
                    />
                    <Text fontWeight="bold" mt={3}>
                      Login Success
                    </Text>
                    <Text fontSize="small">
                      You have successfully login with account.
                    </Text>
                    <br />
                    <Box as={Link} to="/" fontSize="small" textAlign="center">
                      <ArrowBackIcon />
                      back to home
                    </Box>
                  </Box>
                )}
              </Box>
            ) : (
              <CircularProgress isIndeterminate color="green.300" />
            )}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}
