import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Platform } from "react-native";
import Routes from "./routes";

import ExploreScreen from "../screen/ExploreScreen";
import RoutineDetails from "../screen/RoutineDetailScreen";

const Stack = createStackNavigator();

const RoutineNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: true, mode: "modal" }}>
    <Stack.Screen name={Routes.EXPLORE_ROUTINES} component={ExploreScreen} />
    <Stack.Screen
      name={Routes.ROUTINE_DETAILS}
      component={RoutineDetails}
      options={({ route }) => ({
        headerShown: Platform.OS === "android" ? true : false,
        //title: route.params.title,
      })}
    />
  </Stack.Navigator>
);

export default RoutineNavigator;
