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
  ScrollView,
} from "native-base";
import CalendarCard from "../components/CalendarCard";
import MenuItem from "../components/MenuItem";
// import StepCount from "../components/StepCount";
import Routes from "../navigation/routes";
import Toast from "react-native-toast-message";
import WorkoutChart from "../components/WorkoutChart";

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

  // Show toasts when updating history
  useEffect(() => {
    const toast = isLoading
      ? { type: "info", text1: "Loading workout history..." }
      : { type: "success", text1: "Loading finished ✔" };
    Toast.show(toast);
  }, [history]);

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
            <StepCount />
          </Box>
        </HStack> */}
        <ScrollView>
          <WorkoutChart />

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
                  color: "teal.500",
                }}
              />

              <CalendarCard props={isLoading ? {} : history}></CalendarCard>
            </Box>
          </Box>
        </ScrollView>
      </NativeBaseProvider>
    </>
  );
}
