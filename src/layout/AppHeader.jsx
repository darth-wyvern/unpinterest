import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { querySearch } from "../image-management/imageSlice";
import {
  Box,
  Button,
  Flex,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link, useSearchParams } from "react-router-dom";
import { setToken, signout } from "../Auth/AuthSlice";
import { AtSignIcon } from "@chakra-ui/icons";

export default function AppHeader() {
  const dispatch = useDispatch();
  const bgColorHeader = useColorModeValue("white", "gray.800");
  const [searchParams, setSearchParams] = useSearchParams();
  const searchInputRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    // dispatch(querySearch(searchInputRef.current.value));
    searchInputRef.current.focus();
    setSearchParams({
      query: searchInputRef.current.value,
      page: 1
    })
  };

  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (window.localStorage.getItem("authToken")) {
      dispatch(setToken(window.localStorage.getItem("authToken")));
    }
    if (window.sessionStorage.getItem("authToken")) {
      dispatch(setToken(window.sessionStorage.getItem("authToken")));
    }
  }, [dispatch]);

  return (
    <Box position="fixed" left="0" right="0" top={0} bg={bgColorHeader}>
      <Flex p="2rem 1rem" gap={3}>
        <Box as="form" onSubmit={handleSubmit} style={{ flex: "1" }}>
          <Input placeholder="search here" ref={searchInputRef} />
          <Button type="submit" display="none">
            Search
          </Button>
        </Box>
        {token ? (
          <Button
            onClick={() => {
              window.localStorage.removeItem("authToken");
              window.sessionStorage.removeItem("authToken");
              dispatch(signout());
            }}
          >
            Signout
          </Button>
        ) : (
          <Box>
            <Flex gap={3} display={{ base: "none", sm: "flex" }}>
              <Button
                colorScheme="teal"
                fontSize="small"
                as={Link}
                to="/signin"
              >
                Login
              </Button>
              <Button fontSize="small" as={Link} to="/signup">
                Signup
              </Button>
            </Flex>
            <Box display={{ base: "block", sm: "none" }}>
              <Menu>
                <MenuButton as={Button} fontSize="small">
                  <AtSignIcon />
                </MenuButton>
                <MenuList>
                  <MenuItem as={Link} to="/signup" fontSize="small">
                    signup
                  </MenuItem>
                  <MenuItem as={Link} to="/signin" fontSize="small">
                    signin
                  </MenuItem>
                </MenuList>
              </Menu>
            </Box>
          </Box>
        )}
      </Flex>
    </Box>
  );
}
