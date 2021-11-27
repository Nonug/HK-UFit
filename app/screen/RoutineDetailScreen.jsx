import * as React from "react";
import { useState } from "react";
import YoutubePlayer from "react-native-youtube-iframe";
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
} from "native-base";

import RoutineCard from "../components/RoutineCard";
import RadioButton from "../components/RadioButton";
import RoutineList from "../components/RoutineList";
import { LongPressGestureHandler } from "react-native-gesture-handler";
import Routes from "../navigation/routes";
import Toast from "react-native-toast-message";
import moment from "moment";

export default function RoutineDetails({ route, navigation }) {
  const { id, videoID, title, calories } = route.params;

  const pressHandler = () => {
    console.log(moment().format("X")); // Unix timestamp
    console.log(moment().format("DD/MM/YYYY"));

    Toast.show({
      type: "success",
      text1: "Well Done! 🏆",
      text2: `You have finished a workout and burnt ${calories}kcal calories! 💪`,
    });

    // New entry of workout history, id based on unix timestamp

    // TODO: Append this to the WorkoutHistory.json
    var record = {
      id: moment().format("X"),
      date: moment().format("DD/MM/YYYY"), // Maybe redundant
      routine_id: id,
    };

    navigation.navigate(Routes.PROGRESS_NAV);
  };

  return (
    <>
      <NativeBaseProvider>
        <Center>{title}</Center>

        <VStack>
          <Center>
            <Box
              alignItems="center"
              bgColor="white"
              h="190"
              w="95%"
              rounded="lg"
              // marginBottom="4"
            >
              <YoutubePlayer
                webViewStyle={{ opacity: 0.99 }}
                width="95%"
                height={300}
                play={false}
                videoId={videoID}
              />
            </Box>

            <Button size="lg" onPress={() => pressHandler()}>
              Finish Workout
            </Button>
          </Center>
        </VStack>
      </NativeBaseProvider>
    </>
  );
}
