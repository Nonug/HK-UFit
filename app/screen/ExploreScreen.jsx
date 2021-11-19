import * as React from "react";
import { useState } from "react";
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
} from "native-base";
import RoutineCard from "../app/components/RoutineCard";
import RadioButton from "../app/components/RadioButton";
import RoutineList from "../app/components/RoutineList";
import Routes from "../app/navigation/routes";

export default function Explore({ navigation }) {
  // Routine category hook
  const [option, setOption] = useState(null);
  const buttons = [
    { value: "Full Body" },
    { value: "Upper Body" },
    { value: "Lower Body" },
  ];

  return (
    <>
      <NativeBaseProvider>
        <Center>
          <RadioButton data={buttons} onSelect={(value) => setOption(value)} />

          <FlatList
            data={RoutineList}
            renderItem={({ item }) => {
              if (option === null || item.type === option) {
                return (
                  <RoutineCard
                    props={item}
                    onPress={() =>
                      navigation.navigate(Routes.ROUTINE_DETAILS, item)
                    }
                  />
                );
              }
            }}
            keyExtractor={(item) => item.title}
          />
        </Center>
      </NativeBaseProvider>
    </>
  );
}
