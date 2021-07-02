import React, { useState, useEffect, useCallback, useRef } from "react";
import { Button, Flex, Text } from "@react-yuki/ui";
import Swiper from "react-id-swiper";
import SlideItem from "./slideItem";

export const SlideContainer = props => (
  <Flex
    {...props}
    __css={{
      position: "relative",
      ".swiper-container": {
        width: "100%",
        height: "20rem"
      }
    }}
  />
);

export default ({ items }) => {
  // Swiper instance
  const swiperRef = useRef(null);

  // Slides current index
  const [currentIndex, updateCurrentIndex] = useState(0);
  // Params definition
  const params = {
    initialSlide: 3,
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    },
    spaceBetween: 30,
    loop: true,
    autoplay: true
  };

  // Manipulate swiper from outside
  const goNext = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext();
    }
  };

  const goPrev = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  const renderItem = useCallback(
    ({ idx, color, content }) => (
      <SlideItem color={color} content={content} key={`slide_${idx}`} />
    ),
    []
  );

  const updateIndex = useCallback(
    () => updateCurrentIndex(swiperRef.current.swiper.realIndex),
    []
  );

  // Add eventlisteners for swiper after initializing
  useEffect(() => {
    const swiperInstance = swiperRef.current.swiper;

    if (swiperInstance) {
      swiperInstance.on("slideChange", updateIndex);
    }

    return () => {
      if (swiperInstance) {
        swiperInstance.off("slideChange", updateIndex);
      }
    };
  }, [updateIndex]);

  return (
    <Flex flexDirection="column">
      <SlideContainer>
        <Swiper {...params} ref={swiperRef}>
          {items.map(renderItem)}
        </Swiper>
      </SlideContainer>
      <Flex my={5} justifyContent="center" alignItems="center">
        <Button onClick={goPrev} mr={4} bg="green.2" color="white" border={0}>
          Prev
        </Button>
        <Button onClick={goNext} bg="red.4" border={0} color="white">
          Next
        </Button>
      </Flex>
      <Text textAlign="center" width={1} fontSize={4}>
        Current slide index is{" "}
        <Text as="strong" fontWeight={3} color="green.4" fontSize={4}>
          {currentIndex}
        </Text>
      </Text>
    </Flex>
  );
};
