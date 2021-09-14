import React from 'react';
import { ScrollView, Text, View } from 'react-native';

import containers from '../styles/containers.js';
import fonts from '../styles/fonts.js';
import { SoftSquare } from '../components/shapes.js';

export default function HomeSreen() {
  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        horizontal={false}
        contentContainerStyle={{ alignItems: "center" }}
        style={[containers.scrollViewStyle]}
      >

        <View style={[containers.titleContainer]}>
          <Text style={[fonts.titleFont]}>Home</Text>
        </View>

        <SoftSquare color={'rgba(75, 212, 41, 0.3)'}>
          <Text style={[fonts.cardTitle]}>
            Today's Intake
          </Text>
        </SoftSquare>
        <View style={{ flex: 1, paddingTop: 40 }}>
        </View>

        <SoftSquare color={'rgba(132, 138, 217, 0.3)'}>
          <Text style={[fonts.cardTitle]}>
            Other Stats
          </Text>
        </SoftSquare>
        <View style={{ flex: 1, paddingTop: 40 }}>
        </View>

        <SoftSquare color={'rgba(217, 192, 100, 0.3)'}>
          <Text style={[fonts.cardTitle]}>
            Other Stats
          </Text>
        </SoftSquare>
        <View style={{ flex: 1, paddingTop: 40 }}>
        </View>

      </ScrollView>
    </View>

  );
}