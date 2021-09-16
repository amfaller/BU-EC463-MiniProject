import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SearchScreen from "./search";
import UPCID from "./UPCID";
import Scanner from "./scanner";

const Stack = createNativeStackNavigator();

export default function searchStack({ navigation }) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="UPCID" component={UPCID} />
      <Stack.Screen name="Scanner" component={Scanner} />
    </Stack.Navigator>
  );
}