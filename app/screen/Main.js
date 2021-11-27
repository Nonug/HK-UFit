import React from "react";
import {
    MaterialIcons,
    Ionicons,
    MaterialCommunityIcons,
} from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from './HomeScreen';
import FacilitiesScreen from './FacilitiesScreen';
import SocialScreen from './SocialScreen';
import SettingsScreen from './SettingsScreen';

import RoutineNavigator from "../navigation/RoutineNavigator";
import ProgressNavigator from "../navigation/ProgressNavigator";
import Routes from "../navigation/routes";

const Tab = createBottomTabNavigator();

export default Main = () => {
  
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: "#06b6d4",
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    title: "Welcome",
                    tabBarLabel: "Home",
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons
                            name="home"
                            color={color}
                            size={size}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="Facilities"
                component={FacilitiesScreen}
                options={{
                    title: "Facilities Booking",
                    tabBarLabel: "Facility",
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons
                            name="sports-tennis"
                            color={color}
                            size={size}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name={Routes.PROGRESS_NAV}
                component={ProgressNavigator}
                options={{
                    title: "Progress Monitoring",
                    tabBarLabel: "Progress",
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons
                            name="checkmark-circle-outline"
                            color={color}
                            size={size}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="Social"
                component={SocialScreen}
                options={{
                    title: "Social",
                    tabBarLabel: "Social",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="people" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen 
                name={Routes.ROUTINE_NAV}
                component={RoutineNavigator}
                options={{
                    title: "Routines",
                    tabBarLabel: "Routines",
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="barbell" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="Settings"
                component={SettingsScreen}
                options={{
                    title: "Settings",
                    tabBarLabel: "Settings",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="settings" color={color} size={size} />
                    ),
                }}
            />
        </Tab.Navigator>
    );

}
