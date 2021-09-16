import React, { useState } from "react";
import { View, Text, TextInput, Pressable, ScrollView } from 'react-native'

import { shapes, SoftButton } from '../components/shapes.js'
import fonts from '../styles/fonts'
import containers from "../styles/containers.js";

export default function UPCID() {
  const [upcid, setUpcid] = useState('1')

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
          marginTop: 20,
        }}>
          <TextInput
            onChangeText={(input) => setUpcid(input)}
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
                console.log('\"Search\" pressed')
                console.log('Input: ' + upcid)
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