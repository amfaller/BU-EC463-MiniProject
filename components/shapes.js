import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native'

export function SoftSquare(props) {
  const color = props.color;

  return (
    <View style={[shapes.softSquare, { backgroundColor: color }]}>
      {props.children}
    </View>
  )
}

export function SoftButton(props) {
  const color = props.color;

  return (
    <View style={[shapes.softButton, { backgroundColor: color }]}>
      <Pressable
        onPress={() => {
          console.log("Pressed!")
        }}
        style={shapes.softButton}
      >
        {props.children}
      </Pressable>
    </View>
  )
}

const shapes = StyleSheet.create({
  softSquare: {
    flex: 3,
    width: '80%',
    height: 250,
    borderRadius: 23,
  },
  softButton: {
    flex: 1,
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
    height: 100,
    borderRadius: 23,
  }
})