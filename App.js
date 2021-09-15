import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import RNBootSplash from "react-native-bootsplash";
import Icon from 'react-native-vector-icons/MaterialIcons';

import HomeScreen from './screens/home'
import SearchStack from './screens/searchStack';
import ProfileScreen from './screens/profile';

const Tab = createBottomTabNavigator();

export default function App() {
  useEffect(() => {
    const init = async () => {
      // …do multiple sync or async tasks
    };

    init().finally(async () => {
      await RNBootSplash.hide({ fade: true });
      console.log("Bootsplash has been hidden successfully");
    });
  }, []);

  return (
    <NavigationContainer>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />

      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = 'home';
            } else if (route.name === 'SearchStack') {
              iconName = 'search';
            } else if (route.name === 'Profile') {
              iconName = 'account-circle';
            }

            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#6FD98E',
          tabBarInactiveTintColor: 'gray',
          headerShown: false,
          tabBarShowLabel: false
        })}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="SearchStack" component={SearchStack} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}