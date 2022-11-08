import { Box, Button, Checkbox, Flex, Image, Text } from "@chakra-ui/react";

export default function Privacy({
  setPrivacy1,
  setPrivacy2,
  privacy1,
  privacy2,
  next,
  prev,
  handleRegister,
}) {
  return (
    <Box>
      <Box sx={{ span: { fontSize: "small" } }}>
        <Box w="64px" h="64px" borderRadius="50%" overflow="hidden" m="auto">
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
          <Checkbox onChange={() => setPrivacy1(!privacy1)} checked={privacy1}>
            Recieve update about Unpinterest images by email
          </Checkbox>
          <Checkbox onChange={() => setPrivacy2(!privacy2)} checked={privacy2}>
            Recieve communication by email for other images created by the
            Unpinterst
          </Checkbox>
        </Flex>
      </Box>
      <Flex justifyContent="space-between" gap={3} mt={3}>
        <Button onClick={prev}>back</Button>
        <Button
          colorScheme="teal"
          disabled={!(privacy1 && privacy2)}
          onClick={() => {
            next();
            handleRegister();
          }}
        >
          register
        </Button>
      </Flex>
    </Box>
  );
}
