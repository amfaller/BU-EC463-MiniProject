import React from 'react';
import { StyleSheet, View } from 'react-native'

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
      {props.children}
    </View>
  )
}

const shapes = StyleSheet.create({
  softSquare: {
    flex: 3,
    width: '80%',
    height: 250,
    borderRadius: 23,
    shadowColor: '#fff',
    shadowOpacity: 0.8,
    shadowOffset: { width: 9, height: 8 }
  },
  softButton: {
    flex: 1,
    width: '80%',
    height: 100,
    borderRadius: 23,
    shadowColor: '#fff',
    shadowOpacity: 0.8,
    shadowOffset: { width: 9, height: 8 }
  }
})