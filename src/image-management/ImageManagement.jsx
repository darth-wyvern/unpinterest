import React from "react";
import { Box, Spinner, Image, Flex } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import {
  useNavigate,
  createSearchParams,
  useSearchParams,
} from "react-router-dom";
import StorageAPI from "../common/StorageAPI";
import "./style.css";
import { useEffect } from "react";

function CardImage({ data }) {
  const navigator = useNavigate();

  return (
    <Box pt={2} className="card-image">
      <Box
        position="relative"
        borderRadius="1rem"
        overflow="hidden"
        className="wrapper-image"
      >
        <Box
          className="goto"
          pos="absolute"
          m={2}
          zIndex="1"
          bottom="0"
          bgColor="#fff"
          cursor="pointer"
          borderRadius={5}
          p=".2rem .5rem"
          fontSize="small"
          onClick={() => {
            const auth =
              StorageAPI.local.get("authToken") ||
              StorageAPI.session.get("authToken");
            if (auth) {
              window.open(data.links.html);
            } else {
              navigator("/signin");
            }
          }}
        >
          View Detail
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
  const { data, loading, query, page } = useSelector((state) => state.image);
  const [, setSearchParams] = useSearchParams();

  useEffect(() => {
    setSearchParams(createSearchParams({ page: page.number, query: query }));
  }, [page.number, query, setSearchParams]);

  return (
    <Box mt="2rem">
      {loading ? (
        <Box textAlign="center">
          <Spinner />
        </Box>
      ) : (
        <Box>
          <Box className="card-container" columnGap={3}>
            {data.map((i) => (
              <Box key={i.id} display="inline-block" w="100%">
                <CardImage data={i} />
              </Box>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
}
