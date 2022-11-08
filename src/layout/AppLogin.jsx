import React, { useState } from "react";
import { Box, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import Login from "../Auth/Login/Login";
import { useSelector } from "react-redux";
import ToastLogin from "../Auth/Login/ToastLogin";

export default function LoginCheckToast() {
  const { toastSignin } = useSelector((state) => state.auth);
  const [tabIndex, setTabIndex] = useState(0);

  const next = () => {
    setTabIndex(tabIndex + 1);
  };

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
            <Login nextStep={next} />
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
            <ToastLogin toastSignin={toastSignin} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}
