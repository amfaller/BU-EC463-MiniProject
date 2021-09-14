import React from 'react';
import { ScrollView, Text, View } from 'react-native';

import containers from '../styles/containers.js';
import fonts from '../styles/fonts.js';
import { SoftButton } from '../components/shapes.js';

export default function SearchScreen() {
  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        horizontal={false}
        contentContainerStyle={{ alignItems: "center" }}
        style={[containers.scrollViewStyle]}
      >

        <View style={[containers.titleContainer]}>
          <Text style={[fonts.titleFont]}>Profile</Text>
        </View>

      </ScrollView>
    </View>
  );
}