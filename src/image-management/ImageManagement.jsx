import React from "react";
import { Box, Link, Spinner, Image, Flex } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import "./style.css";

function CardImage({ data }) {
  return (
    <Box pt={2} className="card-image">
      <Box
        position="relative"
        borderRadius="1rem"
        overflow="hidden"
        className="wrapper-image"
      >
        <Box
          as={Link}
          href={data.links.html}
          className="goto"
          pos="absolute"
          m={2}
          zIndex='1'
          bottom='0'
          bgColor="#fff"
          w="36px"
          h="36px"
          borderRadius="50%"
        >
          <ExternalLinkIcon
            pos="absolute"
            left="50%"
            top="50%"
            transform="translate(-50%, -50%)"
          />
        </Box>
        <Image
          className="image"
          style={{
            width: "100%",
            height: "100%",
          }}
          src={data.urls.regular}
          alt=""
        />
      </Box>
      <Flex alignItems="center" fontSize="small">
        <Box p={2}>{data.user.username}</Box>
      </Flex>
    </Box>
  );
}

export default function ImageManagement() {
  const { data, loading } = useSelector((state) => state.image);

  return (
    <Box p="2rem" mb={6}>
      {loading ? (
        <Box textAlign="center" m={3}>
          <Spinner />
        </Box>
      ) : (
        <Box>
          <Box className="card-container" columnGap={3} p={1}>
            {
              data.map((i) => (
                <Box key={i.id} display="inline-block" w="100%" mt={5}>
                  <CardImage data={i} />
                </Box>
              ))
            }
          </Box>
        </Box>
      )}
    </Box>
  );
}
