import React, { useState } from "react";
import { Text, View, ScrollView, TextInput, Pressable, ToastAndroid } from "react-native";
import database from '@react-native-firebase/database'

import containers from '../styles/containers'
import fonts from '../styles/fonts'
import { getThemeColorByOpacity } from "../components/utils";
import { firebase } from "@react-native-firebase/auth";

export default function Result({ route, navigation }) {
  let api_key = 'VoN3IN2HARcFIO6lqLJMnI0UUY0SnU92P4xWBmpO'
  const [fdaOutput, setFdaOutput] = useState({})
  var recipeNo = 2;
  var amount = 100;

  // For use with printRecipeToScreen
  const [recipeOutput, setRecipeOutput] = useState('');

  // ------------------------------------------------------------------
  // This region is for FDA API querying and db writing

  // Function to create a new recipe in the Firebase db
  // TODO: Update this reference to be per-user
  function createRecipeInDb(recipeNumber) {

    console.log("Created a firestore entry named Recipe" + recipeNumber);
    const usersCollection = firestore().collection('Recipe' + recipeNumber);
  }

  // Function to save an FDA API query to the Firebase db
  // TODO: Update this reference to be per-user
  function updateDatabase(upcID, recipeName, amount, calories) {
    const newRef = database().ref(`${firebase.auth().currentUser.uid}/recipes/${recipeName}/${upcID}`);

    newRef
      .set({
        'time': new Date().toUTCString(),
        'name': fdaOutput.foods[0].brandName,
        'amount': parseInt(amount),
        'calories': calories
      })
      .then(() => {
        console.log("data pushed")
      })

    database()
      .ref(`${firebase.auth().currentUser.uid}/${new Date().toDateString()}`)
      .child('calories')
      .set(firebase.database.ServerValue.increment(calories * amount / 100))
      .then(() => { console.log('updated today\'s intake') })

    database()
      .ref(`${firebase.auth().currentUser.uid}/${new Date().toDateString()}`)
      .child('lastMod')
      .set(new Date().toUTCString())
      .then(() => { console.log('updated last modified') })
  }

  function getData(upcID) {
    console.log("Querying FDA API with upcID " + upcID + "...");
    console.log('https://api.nal.usda.gov/fdc/v1/foods/search?api_key=' + api_key + '&query=' + upcID);

    // GET request
    return fetch(('https://api.nal.usda.gov/fdc/v1/foods/search?api_key=' + api_key + '&query=' + upcID), {
      method: 'GET',
      'Cache-Control': 'no-cache',
    });
  }

  // Function to query FDA API
  function queryFdaApi(recipeNumber, upcID) {
    // GET request
    if (upcID && upcID.length == 12) {
      getData(upcID)
        .then((response) => response.json())
        .then((responseJson) => {
          // On success, set fdaOutput to the JSON string
          setFdaOutput(responseJson);
          if (upcID == null
            || JSON.stringify(responseJson).includes('Error loading from FDA API')
            || JSON.stringify(responseJson).includes('\"totalHits\":0')) {
            throw 'Error loading from FDA API';
          }
          console.log(">>> Response received: " + JSON.stringify(responseJson));
        })
        // .then(() => {
        // If no error occurs, send the JSON string to the database
        // if (upcID == null || fdaOutput.includes('Error loading from FDA API') || fdaOutput.includes('\"totalHits\":0')) {
        //   console.log("Please enter a valid UPC ID");
        //   setFdaOutput('')
        // }
        // else {
        // console.log("Sending object to db");
        // sendJsonToDb(recipeNumber, upcID)
        //   .then(() => {
        //     console.log('Data set.');
        //     getRecipe(recipeNo);
        //   });
        // }
        // })
        .catch((error) => {
          // Log any errors
          console.error(error);
          setFdaOutput('Error loading from FDA API');
        })
    }
    else {
      console.log('Please enter a 12-digit UPC ID');
    }
  }
  // ------------------------------------------------------------------
  // This region is for database reading

  var initialized = 0;
  var totalCalories = 0;

  var ingredientList = 'Ingredients: ';

  // Function to take each FDA API query that's output by the DB and compile information
  function sumNutrition(ingredient) {
    ingredientList += ingredient._data.foods[0].description;
    ingredientList += '\n';

    // The different elements of foodNutrients are various nutrient informations
    totalCalories += ingredient._data.foods[0].foodNutrients[3].value;
  }

  // Function to print ingredient dump to screen
  // https://stackoverflow.com/questions/9382167/serializing-object-that-contains-cyclic-object-value
  function printRecipeToScreen(recipeRead) {
    var seen = [];

    var tempOutput = JSON.stringify(recipeRead, function (key, val) {
      if (val != null && typeof val == "object") {
        if (seen.indexOf(val) >= 0) {
          return;
        }
        seen.push(val);
      }
      return val;
    })

    // This is an array of the FDA API queries for each ingredient
    var ingredients = JSON.parse(tempOutput)._docs;

    // Run through each FDA API query and compile information
    ingredients.forEach(sumNutrition);

    // Set the text element to display the recipe
    setRecipeOutput(ingredientList + '\nTotal calories: ' + totalCalories);
  }

  // Function to get all ingredients of recipe recipeNumber
  async function getRecipe(recipeNumber) {
    console.log("In getRecipe");
    // if (initialized == 0) {
    // createRecipeInDb(2);
    //   initialized = 1;
    // }

    // NOTE: MAKE SURE getRecipe IS CALLED WITH THE CORRECT ARGUMENT, OTHERWISE THIS WILL NOT WORK
    //       THE ONLY RECIPE WITH DATA IS RECIPE 1 AS OF SEPT 16, 2021
    console.log('Recipe' + recipeNumber)
    const recipeRead = await firestore().collection('Recipe' + recipeNumber).get();
    console.log(recipeRead.docs.map(doc => doc.data()));

    // printRecipeToScreen(recipeRead);
  }

  // =========================================
  const { upcID } = route.params;

  console.log('fdaOutput: ', fdaOutput)

  // determine if `fdaOutput` is empty or error
  if (Object.keys(fdaOutput).length === 0
    || JSON.stringify(fdaOutput).includes('Error loading from FDA API')
    || JSON.stringify(fdaOutput).includes('error')
  ) {
    // request only when data is not loaded (do not re-request if there is error)
    if (Object.keys(fdaOutput).length === 0) {
      queryFdaApi(recipeNo, upcID)
    }
    return (
      <View style={{ flex: 1 }}>
        <ScrollView
          horizontal={false}
          contentContainerStyle={{ alignItems: "center" }}
          style={[containers.scrollViewStyle]}
        >

          <View style={{ marginTop: '5%' }} />
          <View style={{
            flex: 3,
            backgroundColor: getThemeColorByOpacity(0.4),
            borderRadius: 23,
            width: '90%',
            padding: 20,
          }}>
            <Text style={[fonts.cardTitle, { left: 5, top: 0 }]}>
              Result
            </Text>

            <Text style={containers.bar}>
              <Text style={[fonts.barContent, { left: 5 }]}>
                Error loading from FDA APIs
              </Text>
            </Text>

          </View>
          <View style={{ flex: 1, paddingTop: 40 }} />

        </ScrollView>
      </View>
    )
  } else {
    console.log("fdaOutput stringified: ", JSON.stringify(fdaOutput))
    return (
      <View style={{ flex: 1 }}>
        <ScrollView
          horizontal={false}
          contentContainerStyle={{ alignItems: "center" }}
          style={[containers.scrollViewStyle]}
        >

          <View style={{ marginTop: '5%' }} />
          <View style={{
            flex: 3,
            backgroundColor: getThemeColorByOpacity(0.4),
            borderRadius: 23,
            width: '90%',
            padding: 20,
          }}>
            <Text style={[fonts.cardTitle, { left: 5, top: 0 }]}>
              Result
            </Text>

            <Text style={containers.bar}>
              <Text style={fonts.barTitle}>
                Name
              </Text>
              <Text style={[fonts.barContent, { left: 5 }]}>
                :  {fdaOutput.foods[0].brandName}
              </Text>
            </Text>

            <Text style={containers.bar}>
              <Text style={fonts.barTitle}>
                Calories
              </Text>
              <Text style={[fonts.barContent, { left: 5 }]}>
                :  {fdaOutput.foods[0].foodNutrients[3].value} {fdaOutput.foods[0].foodNutrients[3].unitName}
              </Text>
            </Text>

            <Text style={containers.bar}>
              <Text style={fonts.barTitle}>
                Protein
              </Text>
              <Text style={[fonts.barContent, { left: 5 }]}>
                :  {fdaOutput.foods[0].foodNutrients[0].value} {fdaOutput.foods[0].foodNutrients[0].unitName}
              </Text>
            </Text>

            <Text style={containers.bar}>
              <Text style={fonts.barTitle}>
                Sugar
              </Text>
              <Text style={[fonts.barContent, { left: 5 }]}>
                :  {fdaOutput.foods[0].foodNutrients[4].value} {fdaOutput.foods[0].foodNutrients[4].unitName}
              </Text>
            </Text>
          </View>
          <View style={{ paddingTop: 20 }} />

          <View style={[containers.bar, {
            backgroundColor: 'rgba(130, 194, 255, 0.4)',
            width: '90%',
            flexDirection: 'column',
            justifyContent: 'space-around',
          }]}>
            <View style={{ flexDirection: 'row', padding: 10, width: '100%', justifyContent: 'space-evenly' }}>
              <Text style={fonts.barTitle}>
                Recipe to add:
              </Text>
              <TextInput
                onChangeText={(input) => {
                  recipeNo = input
                }}
                placeholder='2'
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: 20,
                  width: '40%'
                }}
                keyboardType={'ascii-capable'}
              />
            </View>
            <View style={{ flexDirection: 'row', padding: 10, width: '100%', justifyContent: 'space-evenly' }}>
              <Text style={fonts.barTitle}>
                Amount:
              </Text>
              <TextInput
                onChangeText={(input) => {
                  amount = input
                }}
                placeholder='100'
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: 20,
                  width: '40%'
                }}
                keyboardType={'numeric'}
              />
              <Text style={fonts.barContent}>
                g
              </Text>
            </View>
            <View style={[{ backgroundColor: '#82C2FF', paddingTop: 10, borderRadius: 20 }]}>
              <Pressable onPress={() => {
                if (recipeNo === '' || amount === '') {
                  alert('Please input recipe to add and amount served')
                }
                console.log('recipeNo: ', recipeNo, ' amount: ', amount, ' email:', firebase.auth().currentUser.email)
                updateDatabase(upcID, recipeNo, amount, fdaOutput.foods[0].foodNutrients[3].value)
                ToastAndroid.show(
                  'Added to ' + firebase.auth().currentUser.email + '\'s recipe ' + recipeNo,
                  ToastAndroid.SHORT
                )
                navigation.navigate('Search')
              }}>
                <Text style={[fonts.barTitle, { textAlign: 'center' }]}>
                  Add to recipe
                </Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}