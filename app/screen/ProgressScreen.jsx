import * as React from "react";
import { useState } from "react";
import {
  NativeBaseProvider,
  Text,
  Button,
  HStack,
  Box,
  Center,
  Pressable,
} from "native-base";
import CalendarCard from "../components/CalendarCard";
import MenuItem from "../components/MenuItem";
import { Pedometer } from "expo-sensors";
import StepCount from "../components/StepCount";
import Routes from "../navigation/routes";

export default function ProgressScreen({ navigation }) {
  // TODO: Populate the selected state with the
  const [selected, setSelected] = useState(null);

  // Sample format of the workout history of a user.
  // Move this to database?
  let history = [
    { id: "1", date: "2021-11-20", routine_id: "full_1" },
    { id: "2", date: "2021-11-21", routine_id: "up_1" },
    { id: "3", date: "2021-11-22", routine_id: "low_1" },
    { id: "4", date: "2021-11-23", routine_id: "low_1" },
    { id: "5", date: "2021-11-24", routine_id: "low_1" },
    { id: "6", date: "2021-11-25", routine_id: "low_1" },
    { id: "7", date: "2021-11-26", routine_id: "low_1" },
  ];

  return (
    <>
      <NativeBaseProvider>
        {/* <Box>Your achievement today:</Box>
        <HStack justifyContent="space-between" margin="5">
          <Box
            paddingX="2"
            rounded="lg"
            bg="amber.100"
            _text={{ fontSize: "3xl" }}
          >
            Calories Burnt
          </Box>
        </HStack> */}

        <Box>
          <Box bg="white" _text={{ fontSize: "lg" }} justifyContent="center">
            <MenuItem
              onPress={() => navigation.navigate(Routes.HISTORY, history)}
              data={{
                id: "WorkoutHist",
                func: "Workout History",
                componentName: "person",
              }}
            />

            <CalendarCard props={history}></CalendarCard>
          </Box>
        </Box>
      </NativeBaseProvider>
    </>
  );
}
