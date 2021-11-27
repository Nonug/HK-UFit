import * as React from "react";
import { useState, useEffect } from "react";
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

async function GetHistory() {
  try {
    // var userId = await SecureStore.getItemAsync("userId");
    // userId = JSON.parse(userId);

    let result = await fetch(
      "https://groupproject26.top/api/progress/get-progress-history"
    );
    let resultJson = await result.json();
    return resultJson;
  } catch (e) {
    console.log(e);
  }
}

export default function ProgressScreen({ navigation }) {
  // TODO: Populate the selected state with the dates
  const [selected, setSelected] = useState(null);

  // TODO: Create a history context to replace props passing
  const [isLoading, setLoading] = useState(true);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    GetHistory()
      .then((record) => {
        setHistory(record.data);
      })
      .then(setLoading(false));
  }, []);

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
              onPress={() =>
                navigation.navigate(Routes.HISTORY, isLoading ? {} : history)
              }
              data={{
                id: "WorkoutHist",
                func: "Workout History",
                componentName: "assessment",
              }}
            />

            <CalendarCard props={isLoading ? {} : history}></CalendarCard>
          </Box>
        </Box>
      </NativeBaseProvider>
    </>
  );
}
