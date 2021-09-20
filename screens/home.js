import React, { useRef } from 'react';
import { ScrollView, Text, View } from 'react-native';
import database, { firebase } from '@react-native-firebase/database'

import containers from '../styles/containers.js';
import fonts from '../styles/fonts.js';
import { SoftSquare } from '../components/shapes.js';
import { useState } from 'react/cjs/react.development';

export default function HomeSreen() {
  // Global vars
  // const [intake, setIntake] = useState('Login to see stats')
  // const [numOfRecipes, setNumOfRecipes] = useState('Login to see stats')
  // const [lastMod, setLastMod] = useState('Login to see stats')
  // const [recipeList, setRecipeList] = useState([])
  const [userData, setUserData] = useState({})
  const [intake, setIntake] = useState(-1)
  const [recipeList, setRecipeList] = useState(null)
  const [lastMod, setLastMod] = useState('Login to see stats')

  // Functions
  function getNumOfRecipe() {
    if (recipeList === null) {
      return 'Login to check stats';
    } else {
      return Object.keys(recipeList).length
    }
  }

  function getIntake() {
    if (intake == -1) {
      return 'Login to check stats'
    } else {
      return intake + ' KCal'
    }
  }

  // function showRecipes() {
  //   if (recipeList == null) return null;

  //   console.log('not null')
  //   var recipeNames = Object.keys(recipeList)
  //   return recipeNames.map((names) => {
  //     <View
  //       key={recipeList[names]}
  //       style={{ height: 100, width: 100, backgroundColor: 'rgb(100, 100, 100)' }}
  //     >
  //       <Text>
  //         {names} ha
  //       </Text>
  //     </View>
  //   })
  // }

  // Inits
  const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
    if (user && Object.keys(userData).length === 0) {
      database().ref(`${firebase.auth().currentUser.uid}/`).once('value', snapshot => {
        console.log('snapshot: ', snapshot.toJSON())
        if (intake == -1) {
          var date = new Date().toDateString()
          setIntake(snapshot.child(date + '/calories').val())
        }

        if (recipeList === null) {
          setRecipeList(snapshot.child('recipes').val())
        }

        if (lastMod == 'Login to see stats') {
          setLastMod(snapshot.child('lastMod').val())
        }
        console.log(
          'intake: ', intake,
          'recipeList: ', recipeList,
          'lastMod: ', lastMod
        )
        setUserData(snapshot)
      })
    }
  })

  unsubscribe();
  console.log('user data: ', userData)

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
            {getIntake()}
          </Text>
        </SoftSquare>
        <View style={{ flex: 1, paddingTop: 40 }}>
        </View>

        <SoftSquare color={'rgba(132, 138, 217, 0.3)'}>
          <Text style={[fonts.cardTitle]}>
            # of Recipes
          </Text>
          <Text style={fonts.cardContent}>
            {getNumOfRecipe()}
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