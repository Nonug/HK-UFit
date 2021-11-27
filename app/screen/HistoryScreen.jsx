import * as React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  NativeBaseProvider,
  Text,
  Box,
  Center,
  Image,
  VStack,
  HStack,
  View,
  FlatList,
  Button,
  Icon,
  CircleIcon,
  Circle,
} from "native-base";

import { Toast } from "react-native-toast-message/lib/src/Toast";

import RoutineList from "../components/RoutineList";
import Routes from "../navigation/routes";

export default function WorkoutHistory({ route }) {
  const history = route.params;

  // Getting a routine via its id
  // Maybe replace this with a proper query
  const getRoutineById = (id) => {
    const matches = RoutineList.filter((routine) => routine.id === id);
    return matches[0];
  };

  return (
    <>
      <NativeBaseProvider>
        <FlatList
          data={history}
          renderItem={({ item }) => {
            return (
              <Center>
                <HStack
                  bgColor="white"
                  w="95%"
                  padding="2"
                  rounded="lg"
                  marginBottom="2"
                  justifyContent="space-between"
                >
                  <Box bg="cyan.500" rounded="full" padding="1">
                    <Icon
                      as={MaterialCommunityIcons}
                      size="sm"
                      name="arm-flex"
                      color="white"
                    />
                  </Box>

                  <Center>
                    <Text bold>{getRoutineById(item.routine_id).title}</Text>
                  </Center>
                  <Box bg="lime.200" rounded="md" padding="1.5">
                    {item.date}
                  </Box>
                </HStack>
              </Center>
            );
          }}
          keyExtractor={(item) => item.id}
        />
      </NativeBaseProvider>
    </>
  );
}
