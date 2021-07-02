import React from "react";
import { Flex, Text } from "@react-yuki/ui";

export default ({ color, content }) => (
  <Flex
    maxHeight="20rem"
    alignItems="center"
    justifyContent="center"
    color="white"
    className="swiper-slide"
    bg={color}
  >
    <Text textAlign="center" fontSize={6}>
      {content}
    </Text>
  </Flex>
);
