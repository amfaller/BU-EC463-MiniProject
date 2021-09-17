import React, { useState } from "react";
import { View, Text, TextInput, Pressable, ScrollView } from 'react-native'

import { shapes, SoftButton } from '../components/shapes.js'
import fonts from '../styles/fonts'
import containers from "../styles/containers.js";

export default function UPCID({ navigation }) {
  const [upcId, onChangeUpcId] = useState(null);

  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <ScrollView
        horizontal={false}
        contentContainerStyle={{ alignItems: "center" }}
        style={[containers.scrollViewStyle]}
      >

        <View style={{
          backgroundColor: 'rgba(220, 220, 220, 0.5)',
          borderRadius: 20,
          alignItems: 'stretch',
          padding: 20,
          marginTop: '20%',
        }}>
          <TextInput
            value={upcId}
            onChangeText={onChangeUpcId}
            onEndEditing={() => {
              console.log('Editing ends with value ' + upcId);

            }}
            placeholder='Input UPC ID here'
            style={{
              backgroundColor: '#ffffff',
              borderRadius: 20,
              marginBottom: 20
            }}
            keyboardType={'numeric'}

          />

          <SoftButton color='rgba(92, 232, 200, 0.5)' >
            <Pressable
              onPress={() => {
                navigation.navigate('Result', { upcID: upcId })
              }}
              style={shapes.softButton}
            >
              <Text style={[fonts.buttonTitle, { fontSize: 24, left: '95%' }]}>
                Search
              </Text>
            </Pressable>
          </SoftButton>

        </View>
      </ScrollView>
    </View>
  );
}