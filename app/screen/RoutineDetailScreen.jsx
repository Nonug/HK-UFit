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

export default function RoutineDetails({ route }) {
  const { _id, videoID, title } = route.params;

  return (
    <>
      <NativeBaseProvider>
        {/* <Center>{title}</Center> */}

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

            <Button size="lg">Finish Workout</Button>
          </Center>
        </VStack>
      </NativeBaseProvider>
    </>
  );
}
