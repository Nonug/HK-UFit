import * as React from "react";
import {
  Text,
  Button,
  Center,
  HStack,
  Box,
  Avatar,
  VStack,
  Divider,
  Heading,
  FlatList,
  Spacer,
  Icon,
  Pressable,
} from "native-base";

import { Ionicons, MaterialIcons } from "@expo/vector-icons";

export default function MenuItem({ data, onPress }) {
  // data:
  // {
  //     id: "2",
  //     func: "Preferences",
  //     componentName: "settings",
  // },

  return (
    <Box borderBottomWidth="1" borderColor="coolGray.200" pl="4" pr="5" py="2">
      <Pressable onPress={onPress}>
        <HStack space={3} justifyContent="space-between">
          <Icon
            as={MaterialIcons}
            name={data.componentName}
            color="coolGray.800"
          />
          <VStack>
            <Center pt="1">
              <Text color="coolGray.800">{data.func}</Text>
            </Center>
          </VStack>
          <Spacer />
          <Icon
            as={Ionicons}
            name={"arrow-forward-sharp"}
            color="coolGray.800"
          ></Icon>
        </HStack>
      </Pressable>
    </Box>
  );
}
