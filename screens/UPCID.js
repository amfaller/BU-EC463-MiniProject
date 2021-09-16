import React, { useState } from "react";
import { View, Text, TextInput, Pressable, ScrollView } from 'react-native'

import { shapes, SoftButton } from '../components/shapes.js'
import fonts from '../styles/fonts'
import containers from "../styles/containers.js";

import firestore from '@react-native-firebase/firestore'

// Put your FDA API key here
var api_key = ''

export default function UPCID() {

  // For general use with recipes
  const [recipeNumber, setRecipeNumber] = useState(1);
  
  // For use with UPC ID text input
  const [text, onChangeText] = useState('');
  const [upcId, onChangeUpcId] = useState(null);

  // For use with queryFdaApi. Holds the returned JSON string
  var fdaOutput = '';

  // ------------------------------------------------------------------
  // This region is for FDA API querying and db writing

  // Function to create a new recipe in the Firebase db
  // TODO: Update this reference to be per-user
  function createRecipeInDb(recipeNumber) {
    
    // console.log("Created a firestore entry named Recipe" + recipeNumber);
    const usersCollection = firestore().collection('Recipe' + recipeNumber);
  }

  // Function to save an FDA API query to the Firebase db
  // TODO: Update this reference to be per-user
  function sendJsonToDb(recipeNumber, upcID) {

    return firestore()
      .collection('Recipe' + recipeNumber)
      .doc(upcID)
      .set(JSON.parse(fdaOutput));
    
  }

  function getData(upcID) {
    console.log("Querying FDA API with upcID " + upcID + "...");
    // console.log('https://api.nal.usda.gov/fdc/v1/foods/search?api_key=' + api_key + '&query=' + upcID);

    // GET request
    return fetch(('https://api.nal.usda.gov/fdc/v1/foods/search?api_key=' + api_key + '&query=' + upcID), {
      method: 'GET',
      'Cache-Control': 'no-cache',
    });
  }

  // Function to query FDA API
  function queryFdaApi(recipeNumber, upcID) {
    // GET request
    if(upcID && upcID.length == 12){
      getData(upcID)
      .then((response) => response.json())
      .then((responseJson) => {
        // On success, set fdaOutput to the JSON string
        fdaOutput = JSON.stringify(responseJson);
        // console.log("Response received: " + JSON.stringify(responseJson));   
      })
      .then(() => {
        // If no error occurs, send the JSON string to the database
        if( upcID==null || fdaOutput.includes('Error loading from FDA API')  || fdaOutput.includes('\"totalHits\":0')) {
          console.log("Please enter a valid UPC ID");
          fdaOutput = '';
        }
        else{
          console.log("Sending object to db");
          sendJsonToDb(recipeNumber, upcID)
            .then(() => {
              console.log('Data set.');
              getRecipe(1);
            });
        }
      })
      // This .then block for testing database read
      .then( () => {
        getRecipe(1);
      })
      .catch((error) => {
        // Log any errors
        alert(JSON.stringify(error));
        console.error(error);
        fdaOutput = 'Error loading from FDA API';
      })
    }
    else{
      console.log('Please enter a 12-digit UPC ID');
    } 
  }
  // ------------------------------------------------------------------
  // This region is for database reading

  var initialized = 0;

  // Function to get all ingredients of recipe recipeNumber
  async function getRecipe(recipeNumber){
    console.log("In getRecipe");
    if(initialized == 0){
      createRecipeInDb(0);
      initialized = 1;
    }

    // TODO: Figure out why this isn't printing all documents in the collection
    // Data is showing up on the Firebase console, so data is definitely being written
    // https://stackoverflow.com/questions/52100103/getting-all-documents-from-one-collection-in-firestore/52101894
    //
    // NOTE: MAKE SURE getRecipe IS CALLED WITH THE CORRECT ARGUMENT, OTHERWISE THIS WILL NOT WORK
    //       THE ONLY RECIPE WITH DATA IS RECIPE 1
    console.log('Recipe' + recipeNumber)
    const recipeRead = await firestore().collection('Recipe' + recipeNumber).get();
        console.log(recipeRead.docs.map(doc => doc.data()));    

    // TODO: Print compiled nutrition information to the screen
  }

  // ------------------------------------------------------------------

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
            value={upcId}
            onChangeText={onChangeUpcId}
            onEndEditing={() => {
              console.log('Editing ends with value ' + upcId);
              
            }}
            placeholder='Input UPC ID here'
            style={{
              backgroundColor: '#ffffff',
              borderRadius: 20,
              width: '80%'
            }}
            keyboardType='numeric'
          />

          <SoftButton color='rgb(214, 229, 189)' style={{ flex: 3 }}>
            <Pressable
              onPress={() => {
                console.log('\"Search\" pressed');
                queryFdaApi(recipeNumber, upcId);
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