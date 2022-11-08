import React, { useState } from "react";
import { Box, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { signupAction } from "../Auth/AuthSlice";
import { useDispatch, useSelector } from "react-redux";
import Register from "../Auth/Register/Register";
import Privacy from "../Auth/Register/privacy";
import ToastRegister from "../Auth/Register/toastRegister";

export default function Register3StepVerification() {
  const dispatch = useDispatch();
  const [privacy1, setPrivacy1] = useState(false);
  const [privacy2, setPrivacy2] = useState(false);
  const { toastSignup } = useSelector((state) => state.auth);

  const [tabIndex, setTabIndex] = useState(0);
  const [dataForm, setDataForm] = useState({});

  const handleTabsChange = (index) => {
    setTabIndex(index);
  };

  const next = () => {
    setTabIndex(tabIndex + 1);
  };

  const prev = () => {
    setTabIndex(tabIndex - 1);
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
              <Privacy
                setPrivacy1={setPrivacy1}
                setPrivacy2={setPrivacy2}
                privacy1={privacy1}
                privacy2={privacy2}
                next={next}
                prev={prev}
                handleRegister={handleRegister}
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
              textAlign="center"
            >
              <ToastRegister toastSignup={toastSignup} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
}
