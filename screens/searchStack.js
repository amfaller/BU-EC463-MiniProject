import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import SearchScreen from "./search";
import UPCID from "./UPCID";

const Stack = createNativeStackNavigator();

export default function searchStack({ navigation }) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="UPCID" component={UPCID} />
    </Stack.Navigator>
  );
}