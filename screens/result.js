import React, { useState } from "react";
import { Text, View, ScrollView } from "react-native";
import firestore from '@react-native-firebase/firestore'

import containers from '../styles/containers'
import { SoftSquare } from '../components/shapes'
import fonts from '../styles/fonts'
import { getThemeColorByOpacity } from "../components/utils";

export default function Result({ route }) {
  let api_key = 'VoN3IN2HARcFIO6lqLJMnI0UUY0SnU92P4xWBmpO'
  const [fdaOutput, setFdaOutput] = useState({})
  var recipeNo = 2;

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
  function sendJsonToDb(recipeNumber, upcID) {
    return firestore()
      .collection('Recipe' + recipeNumber)
      .doc(upcID)
      .set(fdaOutput);
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
        .then(() => {
          // If no error occurs, send the JSON string to the database
          // if (upcID == null || fdaOutput.includes('Error loading from FDA API') || fdaOutput.includes('\"totalHits\":0')) {
          //   console.log("Please enter a valid UPC ID");
          //   setFdaOutput('')
          // }
          // else {
          console.log("Sending object to db");
          sendJsonToDb(recipeNumber, upcID)
            .then(() => {
              console.log('Data set.');
              getRecipe(recipeNo);
            });
          // }
        })
        .catch((error) => {
          // Log any errors
          // alert(JSON.stringify(error));
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

  if (Object.keys(fdaOutput).length === 0
    || JSON.stringify(fdaOutput).includes('Error loading from FDA API')
    || JSON.stringify(fdaOutput).includes('error')
  ) {    // determine if `fdaOutput` is empty or error
    queryFdaApi(recipeNo, upcID)
    return (
      <View style={{ flex: 1 }}>
        <ScrollView
          horizontal={false}
          contentContainerStyle={{ alignItems: "center" }}
          style={[containers.scrollViewStyle]}
        >

          <View style={{ marginTop: '5%' }} />
          <SoftSquare color={'rgba(75, 212, 41, 0.3)'}>
            <Text style={[fonts.cardTitle]}>
              Result
            </Text>
            <Text>
              calories:
            </Text>
          </SoftSquare>
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
          <View style={{ flex: 1, paddingTop: 40 }} />


        </ScrollView>
      </View>
    );
  }
}