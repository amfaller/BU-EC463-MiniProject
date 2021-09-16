import React from "react";
import { Text } from "react-native";

export default function Result({ route }) {
  const { data } = route.params;
  return (
    <Text>
      This is Result Screen, input: {data}
    </Text>
  );
}