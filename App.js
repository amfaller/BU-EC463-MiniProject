import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

// Put API Key here
var api_key = ''

// -------------------------------------------------------------------

// Function to fetch data from the FDA API
// Based on https://aboutreact.com/react-native-http-networking/
const GetDataByUPC = (upc_code) => {

  // Keep output in a `state` since it can change
  const [output, setOutput] = useState('')

  // GET request
  fetch(('https://api.nal.usda.gov/fdc/v1/foods/search?api_key=' + api_key + '&query=' + upc_code), {
    method: 'GET',
  })

  // If the response is in json, then GET was a success
  .then((response) => response.json())
  .then((responseJson) => {
    // Success
    setOutput(JSON.stringify(responseJson));
  })

  // If the response is not in json, then error
  .catch((error) => {
    // Error
    alert(JSON.stringify(error));
    console.error(error);

    setOutput('Error loading from FDA API')
  })

  // TODO: Instead of returning a text dump, send the JSON to the database
  return(
      <Text>{output}</Text>
  )

}

// -------------------------------------------------------------------

export default function App() {
  return (
    <View style={styles.container}>
      { /*  TODO: Add the camera module to scan in the barcode
                  and get the UPC number from barcode.
            This is a placeholder UPC number for proof-of-life.
        */
      }
      <Text>{GetDataByUPC(602652184024)}</Text>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
