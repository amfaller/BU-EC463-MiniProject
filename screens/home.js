import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';

import containers from './styles/containers';
import fonts from './styles/fonts';
import SoftSquare from './components/shapes';
import { getThemeColorByOpacity } from './components/utils';

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="auto" />

      {/* TODO: contains magic number */}
      <View style={{ flex: 17 }}>
        <ScrollView
          horizontal={false}
          contentContainerStyle={{ alignItems: "center" }}
          style={[containers.scrollViewStyle]}
        >

          <View style={[containers.titleContainer]}>
            <Text style={[fonts.titleFont]}>Home</Text>
          </View>

          <SoftSquare color={getThemeColorByOpacity(0.3)}>
            <View style={containers.container}>
              <Text style={[fonts.cardTitle]}>
                Today's Intake
              </Text>
            </View>
          </SoftSquare>

          <View style={[containers.container]}>
            <Text>Container 2</Text>
          </View>

        </ScrollView>
      </View>

      {/* Navigation bar */}
      <View style={[containers.mainContainer, { flex: 1, backgroundColor: '#f0f0f0' }]}>
        <Text>Navigate</Text>
      </View>
    </View>
  );
}