import * as React from "react";
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
  // const permissions = [
  //   {
  //     kind: Fitness.PermissionKinds.Steps,
  //     access: Fitness.PermissionAccesses.Write,
  //   },
  // ];

  // const end = new Date();
  // const start = new Date();
  // start.setDate(end.getDate() - 1);

  // Fitness.isAuthorized(permissions)
  //   .then((authorized) => {
  //     console.log(authorized);
  //     Fitness.subscribeToSteps();
  //   })
  //   .catch((error) => {
  //     // Do something
  //     console.log(error);
  //   });
  return (
    <>
      <NativeBaseProvider>
        <Box>Your achievement today:</Box>
        <HStack justifyContent="space-between" margin="5">
          <Box
            paddingX="2"
            rounded="lg"
            bg="amber.100"
            _text={{ fontSize: "3xl" }}
          >
            {/* <StepCount></StepCount> */}
            Step count
          </Box>
          <Box
            paddingX="2"
            rounded="lg"
            bg="amber.100"
            _text={{ fontSize: "3xl" }}
          >
            Calories Burnt
          </Box>
        </HStack>

        <Box>
          <Box bg="white" _text={{ fontSize: "lg" }} justifyContent="center">
            <MenuItem
              onPress={navigation.navigate(Routes.HISTORY)}
              data={{
                id: "WorkoutHist",
                func: "Workout History",
                componentName: "person",
              }}
            />

            <CalendarCard></CalendarCard>
          </Box>
        </Box>
      </NativeBaseProvider>
    </>
  );
}
