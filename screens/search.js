import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

import containers from '../styles/containers.js';
import fonts from '../styles/fonts.js';
import { shapes, SoftButton } from '../components/shapes.js';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function SearchScreen({ navigation }) {
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
          <Pressable
            style={shapes.softButton}
            onPress={() => {
              console.log('navigating to UPC ID screen')
              navigation.navigate('UPCID')
            }}
          >
            <Icon name='text-fields' size={40} color='rgb(110, 110, 110)' style={{ bottom: 5, paddingLeft: '5%' }} />
            <Text style={[fonts.buttonTitle, { fontSize: 24 }]}>
              Search UPC ID
            </Text>
          </Pressable>
        </SoftButton>
        <View style={{ flex: 1, paddingTop: 40 }}>
        </View>

        {/* TODO: Camera functionality */}
        <SoftButton color={'rgba(110, 240, 186, 0.3)'}>
          <Icon name='qr-code' size={40} color='rgb(110, 110, 110)' style={{ bottom: 5, paddingLeft: '5%' }} />
          <Text style={[fonts.buttonTitle, { fontSize: 24 }]}>
            Scan QR Code
          </Text>
        </SoftButton>
        <View style={{ flex: 1, paddingTop: 40 }}>
        </View>

        {/* TODO: When this button is clicked, read from the database and increment recipeNumber in UPCID.js */}
        <SoftButton color={'rgba(110, 240, 112, 0.3)'}>
          <Icon name='restaurant' size={40} color='rgb(110, 110, 110)' style={{ bottom: 5, paddingLeft: '5%' }} />
          <Text style={[fonts.buttonTitle, { fontSize: 24 }]}>
            Add Recipe
          </Text>
        </SoftButton>
        <View style={{ flex: 1, paddingTop: 40 }}>
        </View>
      </ScrollView>

    </View >
  );
}