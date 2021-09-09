import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

// Put API Key here
var api_key = ''

// Put query UPC code here (TODO: Get UPC code from camera (barcode))
var upc_code = 602652184024   // Placeholder value

// -------------------------------------------------------------------

// A sample function to fetch data from the FDA API
// Based on https://aboutreact.com/react-native-http-networking/
const GetDataByUPC = () => {

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

  return(
      <Text>{output}</Text>
  )

}

// -------------------------------------------------------------------

export default function App() {
  return (
    <View style={styles.container}>
      <Text>{GetDataByUPC()}</Text>
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
