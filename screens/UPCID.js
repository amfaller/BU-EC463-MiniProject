import React from "react";
import { View, Text, TextInput, Pressable, ScrollView } from 'react-native'

import { shapes, SoftButton } from '../components/shapes.js'
import fonts from '../styles/fonts'
import containers from "../styles/containers.js";

export default function UPCID() {
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
            onEndEditing={() => {
              console.log('Editing ends')
            }}
            placeholder='Input UPC ID here'
            style={{
              backgroundColor: '#ffffff',
              borderRadius: 20,
              width: '80%'
            }}
          />

          <SoftButton color='rgb(214, 229, 189)' style={{ flex: 3 }}>
            <Pressable
              onPress={() => {
                console.log('\"Search\" pressed')
              }}
              style={shapes.softButton}
            >
              <Text style={[fonts.buttonTitle, { fontSize: 24 }]}>
                Search
              </Text>
            </Pressable>
          </SoftButton>
        </View>
      </ScrollView>
    </View>
  )
}