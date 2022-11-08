import {
  Badge,
  Box,
  Button,
  Image,
  Text,
  CircularProgress,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { ArrowBackIcon } from "@chakra-ui/icons";

export default function ToastLogin({ toastSignin }) {
  return (
    <Box>
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
              <Badge colorScheme="red" p=".3rem .5rem" whiteSpace="pre-line">
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
    </Box>
  );
}
