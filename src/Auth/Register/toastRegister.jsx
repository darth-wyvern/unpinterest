import {
  Badge,
  Box,
  Button,
  CircularProgress,
  Image,
  Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { ArrowBackIcon } from "@chakra-ui/icons";

export default function ToastRegister({ toastSignup }) {
  return (
    <Box>
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
              <Badge colorScheme="red" p=".3rem .5rem" whiteSpace="pre-line">
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
    </Box>
  );
}
