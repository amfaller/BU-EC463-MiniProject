import React from 'react';
import { ScrollView, Text, View } from 'react-native';

import containers from '../styles/containers.js';
import fonts from '../styles/fonts.js';
import { SoftButton } from '../components/shapes.js';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function SearchScreen() {
  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        horizontal={false}
        contentContainerStyle={{ alignItems: "center" }}
        style={[containers.scrollViewStyle]}
      >

        <View style={[containers.titleContainer]}>
          <Text style={[fonts.titleFont]}>Search</Text>
        </View>

        <SoftButton color={'rgba(106, 230, 213, 0.3)'}>
          <Icon name='text-fields' size={40} color='rgb(110, 110, 110)' style={{ bottom: 5, paddingLeft: '5%' }} />
          <Text style={[fonts.buttonTitle, { fontSize: 24 }]}>
            Search UPC ID
          </Text>
        </SoftButton>
        <View style={{ flex: 1, paddingTop: 40 }}>
        </View>

        <SoftButton color={'rgba(110, 240, 186, 0.3)'}>
          <Icon name='qr-code' size={40} color='rgb(110, 110, 110)' style={{ bottom: 5, paddingLeft: '5%' }} />
          <Text style={[fonts.buttonTitle, { fontSize: 24 }]}>
            Scan QR Code
          </Text>
        </SoftButton>
        <View style={{ flex: 1, paddingTop: 40 }}>
        </View>

        <SoftButton color={'rgba(110, 240, 112, 0.3)'}>
          <Icon name='restaurant' size={40} color='rgb(110, 110, 110)' style={{ bottom: 5, paddingLeft: '5%' }} />
          <Text style={[fonts.buttonTitle, { fontSize: 24 }]}>
            Add Recipe
          </Text>
        </SoftButton>
        <View style={{ flex: 1, paddingTop: 40 }}>
        </View>
      </ScrollView>
    </View>
  );
}