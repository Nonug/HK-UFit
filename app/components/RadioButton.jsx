import { Text, HStack, View, Pressable } from "native-base";
import React from "react";
import { useState } from "react";
import styles from "./styles";

export default function RadioButton({ data, onSelect }) {
  const [userOption, setUserOption] = useState(null);
  const selectHandler = (value) => {
    if (userOption === value) {
      value = null;
    }
    onSelect(value);
    setUserOption(value);
  };
  return (
    <HStack>
      {data.map((item) => {
        return (
          <Pressable
            key={item.id} // Dk why still get "Warning: Each child in a list should have a unique "key" prop."
            style={
              item.value === userOption ? styles.selected : styles.unselected
            }
            onPress={() => selectHandler(item.value)}
          >
            <Text style={styles.option}> {item.value}</Text>
          </Pressable>
        );
      })}
    </HStack>
  );
}
