import React, { useState, useEffect } from 'react';
import { ScrollView, Text, View, Button } from 'react-native';

import containers from '../styles/containers.js';
import fonts from '../styles/fonts.js';
import { SoftButton } from '../components/shapes.js';


// ---------------------------------------------------------------------------------------
// From https://rnfirebase.io/auth/social-auth#google
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId: '815056068464-qfcf1djrk3pfdh7ik1d68sbr29j0qpkm.apps.googleusercontent.com',
})

function GoogleSignIn() {
  return (
    <Button
      title="Google Sign-In"
      onPress={() => onGoogleButtonPress()
        .then(() => console.log('Signed in with Google!'))
        .catch((error) => console.log("API Call Error: " + error.message))
      }
    />
  );
}

async function onGoogleButtonPress() {
  // Get the users ID token
  const { idToken } = await GoogleSignin.signIn();

  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  // Sign-in the user with the credential
  return auth().signInWithCredential(googleCredential);
}

function logUserEmail(user) {
  if(!user)
    return null;

  console.log("User email: " + user.email);
  return null;
}
// ---------------------------------------------------------------------------------------

export default function SearchScreen() {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handler for user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
    logUserEmail(user);
  }

  // Subscribe onAuthStateChanged() to auth().onAuthStateChanged interrupt
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  // Show logged-in user email
  function helloUser(user) {
    if(!user)
      return null;

    return(
      <Text>Hello {user.email}!</Text>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        horizontal={false}
        contentContainerStyle={{ alignItems: "center" }}
        style={[containers.scrollViewStyle]}
      >

        <View style={[containers.titleContainer]}>
          <Text style={[fonts.titleFont]}>Profile</Text>
          {GoogleSignIn()}
          {helloUser(user)}
        </View>

      </ScrollView>
    </View>
  );
}