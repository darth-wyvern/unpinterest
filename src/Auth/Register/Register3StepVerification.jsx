import React, { useState, useEffect } from "react";
import {
  Badge,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Flex,
  Image,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import Register from "./Register";
import { useNavigate, Link } from "react-router-dom";
import { signupAction } from "../AuthSlice";
import { useDispatch, useSelector } from "react-redux";
import { ArrowBackIcon } from "@chakra-ui/icons";

export default function Register3StepVerification() {
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const [privacy1, setPrivacy1] = useState(false);
  const [privacy2, setPrivacy2] = useState(false);
  const { toastSignup } = useSelector((state) => state.auth);

  useEffect(() => {
    console.log(toastSignup);
  }, [toastSignup]);

  const [tabIndex, setTabIndex] = useState(0);
  const [dataForm, setDataForm] = useState({});

  const handleTabsChange = (index) => {
    setTabIndex(index);
  };

  const handleRegister = () => {
    dispatch(signupAction(dataForm));
  };
  return (
    <Box
      bg={{ base: "white", sm: "#0007" }}
      position="fixed"
      inset={0}
      overflow="auto"
      zIndex={999}
    >
      <Box>
        <Tabs index={tabIndex} onChange={handleTabsChange}>
          <TabPanels>
            <TabPanel>
              <Register
                nextStep={() => setTabIndex(tabIndex + 1)}
                getValues={setDataForm}
              />
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
              p="40px"
            >
              <Box sx={{ span: { fontSize: "small" } }}>
                <Box
                  w="64px"
                  h="64px"
                  borderRadius="50%"
                  overflow="hidden"
                  m="auto"
                >
                  <Image
                    w="100%"
                    h="100%"
                    objectFit="cover"
                    src="https://cdn3.vectorstock.com/i/1000x1000/28/47/lock-icon-with-a-long-shadow-vector-20142847.jpg"
                    loading="lazy"
                  />
                </Box>
                <Box fontSize="xx-large" textAlign="center" mb={5}>
                  Register
                </Box>
                <Text>Privacy register:</Text>
                <Flex flexDir="column" gap={3} mt={3}>
                  <Checkbox
                    onChange={() => setPrivacy1(!privacy1)}
                    checked={privacy1}
                  >
                    Recieve update about Unpinterest images by email
                  </Checkbox>
                  <Checkbox
                    onChange={() => setPrivacy2(!privacy2)}
                    checked={privacy2}
                  >
                    Recieve communication by email for other images created by
                    the Unpinterst
                  </Checkbox>
                </Flex>
              </Box>
              <Flex justifyContent="space-between" gap={3} mt={3}>
                <Button onClick={() => setTabIndex(tabIndex - 1)}>back</Button>
                <Button
                  colorScheme="teal"
                  disabled={!(privacy1 && privacy2)}
                  onClick={() => {
                    setTabIndex(tabIndex + 1);
                    handleRegister();
                  }}
                >
                  register
                </Button>
              </Flex>
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
              {toastSignup ? (
                <Box pos="relative" p="40px">
                  {toastSignup.message ? (
                    <Box>
                      <Image
                        w="5vw"
                        minW="3rem"
                        m="auto"
                        src="https://cdn3.iconfinder.com/data/icons/simple-web-navigation/165/cross-512.png"
                        alt=""
                      />
                      <Box color="red" fontSize="small" mt={4}>
                        {toastSignup.message}
                      </Box>
                      <Badge
                        colorScheme="red"
                        p=".3rem .5rem"
                        whiteSpace="pre-line"
                      >
                        Registration failed! please try again laters
                      </Badge>
                      <Link to="signup">
                        <Button
                          colorScheme="facebook"
                          mt={6}
                          mb={3}
                          onClick={() => navigator(-1)}
                        >
                          Register again
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
                        Register Success
                      </Text>
                      <Text fontSize="small">
                        You have successfully register your account.
                      </Text>
                      <Button
                        as={Link}
                        to="/signin"
                        colorScheme="facebook"
                        mt={6}
                        mb={3}
                      >
                        Process to Login
                      </Button>
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
    </Box>
  );
}
