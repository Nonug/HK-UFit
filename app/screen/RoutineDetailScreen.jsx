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

async function PostWorkoutRecord(record) {
  // console.log("Content to be post: " + record.date);

  try {
    let REQUEST_URL =
      "https://groupproject26.top/api/progress/post-progress-history";
    let parameters = new FormData();
    // parameters.append("id", record.id);
    parameters.append("date", record.date);
    parameters.append("routine_id", record.routine_id);

    try {
      let response = await fetch(REQUEST_URL, {
        method: "POST",
        body: parameters,
      });
      // Ok up til here
      let responseJSON = await response.json(); // JSON Parse error: Unrecognized token '<'
      console.log(responseJSON);
      return responseJSON;
    } catch (error) {
      // // Catched
      // console.log("here");
      console.log(error);
    }
  } catch (err) {
    console.error(err);
  }
}

export default function RoutineDetails({ route, navigation }) {
  const { id, videoID, title, calories } = route.params;

  const pressHandler = () => {
    // console.log(moment().format("X")); // Unix timestamp
    // console.log(moment().format("DD/MM/YYYY"));

    Toast.show({
      type: "success",
      text1: "Well Done! 🏆",
      text2: `You have finished a workout and burnt ${calories}kcal calories! 💪`,
    });

    // New entry of workout history, id based on unix timestamp
    var record = {
      id: moment().format("X"),
      date: moment().format("YYYY-MM-DD"), // Maybe redundant
      routine_id: id,
    };

    PostWorkoutRecord(record).then((response) => {
      if (response.status == 'success') {
        navigation.navigate(Routes.PROGRESS_NAV, {
          refresh: true,
        });
        console.log(response);
      } else {
        console.log("Failure to POST workout history");
        console.log(response.status);
        console.log(response);
      }
    });
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
