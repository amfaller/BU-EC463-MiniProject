// This should be in home.js, now it's a placeholder
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Stylesheet, ScrollView, Text, View } from 'react-native';
import containers from './styles/containers';
import fonts from './styles/fonts';
import SoftSquare from './components/shapes';
import { getThemeColorByOpacity } from './components/utils';

// Put API Key here
var api_key = ''

// -------------------------------------------------------------------

// Function to fetch data from the FDA API
// Based on https://aboutreact.com/react-native-http-networking/
// Call with `<Text>{GetDataByUPC(602652184024)}</Text>`
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

    <View style={{ flex: 1 }}>
      <StatusBar style="auto" />

      {/* TODO: contains magic number */}
      <View style={{ flex: 30 }}>
        <ScrollView
          horizontal={false}
          contentContainerStyle={{ alignItems: "center" }}
          style={[containers.scrollViewStyle]}
        >

          <View style={[containers.titleContainer]}>
            <Text style={[fonts.titleFont]}>Home</Text>
          </View>

          <SoftSquare color={getThemeColorByOpacity(0.3)}>
            <View style={containers.container}>
              <Text style={[fonts.cardTitle]}>
                Today's Intake
              </Text>
            </View>
          </SoftSquare>

          <View style={[containers.container, {backgroundColor: 'rgb(190, 190, 190)'}]}>
            <Text>Container 2</Text>
          </View>

        </ScrollView>
      </View>

      {/* Navigation bar */}
      <View style={[containers.mainContainer, { flex: 1, backgroundColor: 'rgb(240, 240, 240)' }]}>
        <Text>Navigate</Text>
      </View>
    </View>
  );
}