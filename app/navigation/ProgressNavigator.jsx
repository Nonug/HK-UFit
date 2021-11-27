import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Platform } from "react-native";
import Routes from "./routes";
import WorkoutHistory from "../screen/HistoryScreen";
import ProgressScreen from "../screen/ProgressScreen";

const Stack = createStackNavigator();

const ProgressNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: true, presentation: "modal" }}>
    <Stack.Screen name={Routes.PROGRESS} component={ProgressScreen} />
    <Stack.Screen
      name={Routes.HISTORY}
      component={WorkoutHistory}
      options={({ route }) => ({
        headerShown: Platform.OS === "android" ? true : false,
        //title: route.params.title,
      })}
    />
  </Stack.Navigator>
);

export default ProgressNavigator;
