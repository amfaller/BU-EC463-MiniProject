import React, { useState, useEffect } from 'react';
import { ScrollView, Text, View, Button, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import containers from '../styles/containers.js';
import fonts from '../styles/fonts.js';
import { SoftButton, shapes } from '../components/shapes.js';

// ---------------------------------------------------------------------------------------
// From https://rnfirebase.io/auth/social-auth#google
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId: '815056068464-qfcf1djrk3pfdh7ik1d68sbr29j0qpkm.apps.googleusercontent.com',
})

function GoogleSignIn() {
  return (
    <View style={{ flex: 1 }}>
      <SoftButton color={'rgba(72, 125, 224, 0.3)'}>
        <Pressable
          style={shapes.softButton}
          onPress={() => onGoogleButtonPress()
            .then(() => console.log('Signed in with Google!'))
            .catch((error) => console.log("API Call Error: " + error.message))
          }
        >
          <Icon name='login' size={40} color='rgb(110, 110, 110)' style={{ bottom: 5, paddingLeft: '5%' }} />
          <Text style={[fonts.buttonTitle, { fontSize: 24 }]}>
            Google Sign-In
          </Text>
        </Pressable>
      </SoftButton>
      <View style={{ flex: 1, paddingTop: 40 }}>
      </View>
    </View >
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
  if (!user)
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
    if (!user)
      return null;

    return (
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
          <View style={{ alignItems: 'center' }}>
            {GoogleSignIn()}
          </View>
          {helloUser(user)}
        </View>

      </ScrollView>
    </View>
  );
}