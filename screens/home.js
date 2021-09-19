import React from 'react';
import { FlatList, ScrollView, Text, View } from 'react-native';
import database, { firebase } from '@react-native-firebase/database'

import containers from '../styles/containers.js';
import fonts from '../styles/fonts.js';
import { SoftSquare } from '../components/shapes.js';
import { useState } from 'react/cjs/react.development';

export default function HomeSreen() {
  // Global vars
  const [intake, setIntake] = useState(0)
  const [numOfRecipes, setNumOfRecipes] = useState(0)
  const [lastMod, setLastMod] = useState(null)

  // Functions for stats
  function getTodayIntake() {
    database().ref(`${firebase.auth().currentUser.uid}/${new Date().toDateString()}`).on('value', snapshot => {
      setIntake(snapshot.toJSON().calories)
    })
  }

  /**
   * Get number of recipes and init recipeList with recipe names
   */
  function getRecipeList() {
    database().ref(`${firebase.auth().currentUser.uid}/recipes`).once('value').then(snapshot => {
      setNumOfRecipes(Object.keys(snapshot.toJSON()).length)
    })
  }

  function getLastMod() {
    database().ref(`${firebase.auth().currentUser.uid}/${new Date().toDateString()}`).once('value').then(snapshot => {
      setLastMod(snapshot.toJSON().lastMod)
    })
  }

  // Inits
  getRecipeList();
  getTodayIntake();
  getLastMod();
  
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
          <Text style={[fonts.cardContent, { textAlign: 'right' }]}>
            {intake} KCal
          </Text>
        </SoftSquare>
        <View style={{ flex: 1, paddingTop: 40 }}>
        </View>

        <SoftSquare color={'rgba(132, 138, 217, 0.3)'}>
          <Text style={[fonts.cardTitle]}>
            # of Recipes
          </Text>
          <Text style={fonts.cardContent}>
            {numOfRecipes}
          </Text>
        </SoftSquare>
        <View style={{ flex: 1, paddingTop: 40 }}>
        </View>

        <View style={{ flex: 1, paddingTop: 40 }}>
        </View>

        <SoftSquare color={'rgba(217, 192, 100, 0.3)'}>
          <Text style={[fonts.cardTitle]}>
            Last Update
          </Text>
          <Text style={fonts.cardContent}>
            {lastMod}
          </Text>
        </SoftSquare>
        <View style={{ flex: 1, paddingTop: 40 }}>
        </View>

        <View style={{ flex: 1, paddingTop: 40 }}>
        </View>

      </ScrollView>
    </View>
  );
}