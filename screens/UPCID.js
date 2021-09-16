import React, { useState } from "react";
import { View, Text, TextInput, Pressable, ScrollView } from 'react-native'

import { shapes, SoftButton } from '../components/shapes.js'
import fonts from '../styles/fonts'
import containers from "../styles/containers.js";

import database from '@react-native-firebase/database';

// Put your FDA API key here
var api_key = 'VoN3IN2HARcFIO6lqLJMnI0UUY0SnU92P4xWBmpO'

export default function UPCID() {

  // For general use with recipes
  const [recipeNumber, setRecipeNumber] = useState(0);
  
  // For use with UPC ID text input
  const [text, onChangeText] = useState('');
  const [upcId, onChangeUpcId] = useState(null);

  // For use with queryFdaApi. Holds the returned JSON string
  var fdaOutput = '';

  // Function to create a new recipe in the Firebase db
  // TODO: Update this reference to be per-user
  function createRecipeInDb(recipeNumber) {
    const reference = database().ref('/recipes/' + recipeNumber);
  }

  // Function to save an FDA API query to the Firebase db
  // TODO: Update this reference to be per-user
  function sendJsonToDb(recipeNumber, upcID) {
    database()
    .ref('/recipes/' + recipeNumber + '/' + upcID)
    .set(fdaOutput)
    .then(() => console.log('Data set.'));
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
    if(upcID.length == 12){
      getData(upcID)
      .then((response) => response.json())
      .then((responseJson) => {
        // On success, set fdaOutput to the JSON string
        fdaOutput = JSON.stringify(responseJson);
        console.log("Response received: " + JSON.stringify(responseJson));   
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
        }
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