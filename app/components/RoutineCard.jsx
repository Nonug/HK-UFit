import React from "react";
import {
  View,
  Image,
  Center,
  Box,
  Text,
  HStack,
  VStack,
  Pressable,
} from "native-base";

const RoutineCard = ({ props, onPress }) => {
  const pressHandler = (value) => {
    // onSelect(value);
  };
  return (
    <Pressable
      bgColor="white"
      w="90%"
      mx="4"
      rounded="lg"
      marginBottom="4"
      onPress={onPress}
    >
      <Image
        rounded="lg"
        height="150"
        width="100%"
        resizeMode="cover"
        source={{
          uri: `http://i3.ytimg.com/vi/${props.videoID}/maxresdefault.jpg`,
        }}
        alt="Alternate Text"
      />

      <VStack marginLeft="2" marginTop="2" marginBottom="1" space="1.5">
        <HStack justifyContent="space-between">
          <Text fontSize="sm" color="black" fontWeight="bold">
            {props.title}
          </Text>

          <Text fontSize="xs" color="black" marginRight="2">
            By {props.author}
          </Text>
        </HStack>

        <Text fontSize="2xs" color="black" minWidth="full">
          {props.desc}
        </Text>

        <HStack space="1">
          <Box p="0.5" rounded="lg" bg="primary.500" _text={{ fontSize: "xs" }}>
            {props.tags}
          </Box>
        </HStack>
      </VStack>
    </Pressable>
  );
};

export default RoutineCard;
