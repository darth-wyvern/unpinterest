import React from "react";
import { Box, Spinner, Image, Flex } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import StorageAPI from "../common/StorageAPI";
import "./style.css";
import { setImageChoosing } from "./imageSlice";

function CardImage({ data, index }) {
  const navigator = useNavigate();
  const dispatch = useDispatch();

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
          onClick={() => {
            const auth =
              StorageAPI.local.get("authToken") ||
              StorageAPI.session.get("authToken");
            if (auth) {
              navigator("/lightbox");
              dispatch(setImageChoosing(index));
            } else {
              navigator("/signin");
            }
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
    <Box mt="2rem">
      {loading ? (
        <Box textAlign="center">
          <Spinner />
        </Box>
      ) : (
        <Box>
          <Box className="card-container" columnGap={3}>
            {data.map((i, index) => (
              <Box key={i.id} display="inline-block" w="100%">
                <CardImage data={i} index={index} />
              </Box>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
}
