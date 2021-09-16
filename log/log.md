# Log file for SW Mini Project progress

## September 7, 2021

Tony read through some React Native documentation, starting from [Introduction](https://reactnative.dev/docs/getting-started) to [Setting up the development environment](https://reactnative.dev/docs/environment-setup). This includes running the `AwesomeProject` tutorial project on his phone.

## September 8, 2021

Yuxuan inits this project with `expo` `minimum app` preset and `README.md`

Tony added a hardcoded function to retrieve product data from the FDA API. This simply prints the returned JSON string to the web page.

## September 9, 2021

Tony began learning how to use Firebase. He tried to follow [one tutorial](https://rnfirebase.io/) then [another](https://docs.expo.dev/guides/setup-native-firebase/), but he was unsuccessful. When he tried to launch the app, the emulators refused to connect to the server.

Tony also modified the FDA API function to be more generic and not hard coded.

## September 10, 2021

Tony struggled to get Firebase working. He followed instructions and believes the appropriate Firebase SDKs are installed in the app, but when actually trying to make an API call, an error pops up that says `Error: You attempted to use a firebase module that's not installed in your Android project  by calling firebase.app().` [This is not a new bug](https://github.com/invertase/react-native-firebase/issues/977), so he will continue searching for a solution.

Tony attempted to implement [authenticaion](https://rnfirebase.io/auth/usage) and [database](https://rnfirebase.io/database/usage), but neither was successful.

## September 11, 2021

Tony realized that in order to use Firebase in our project, we had to create our project under context of the React Native CLI, as opposed to the Expo CLI. Firebase is considered a "native module," meaning that it is incompatible with Expo. He used a test project as a proof-of-concept for this.

## September 13, 2021

Tony created a proof-of-concept application for use with Google authentication. He got as far as to add a button that brings up the Google sign-in dialogue when clicked, but once sign-in is attempted, a `DEVELOPER_ERROR` is raised. He followed these tutorials after creating a new project with `npx react-native init AwesomeProject2`.

* [Installation](https://github.com/react-native-google-signin/google-signin#project-setup-and-initialization)
* [Configure Firebase with Android Credentials](https://rnfirebase.io/)
* [General `auth` instructions](https://rnfirebase.io/auth/usage)
* [Google-specific `auth` instructions](https://rnfirebase.io/auth/social-auth#google)

## September 14, 2021

Tony added Google authentication to the project.

Yuxuan rebuilt the entire app with react-native CLI following the [tutorial](https://reactnative.dev/docs/environment-setup). Furthermore, he added [TabNavigation](https://reactnavigation.org/docs/tab-based-navigation), [SplashScreen](https://github.com/zoontek/react-native-bootsplash) and [customizedFont](https://mehrankhandev.medium.com/ultimate-guide-to-use-custom-fonts-in-react-native-77fcdf859cf4) to the android native and re-drew the app icon.

Yuxuan setup the basic framework for `Search` screen and implemented shapes that will be commonly used in app

## September 15, 2021

Yuxuan finished writing customized button, however, he didn't figure out how to pass functions as `props` to the button component.

Yuxuan built basic framework for search by UPC ID screen and scan QR code screen, the next step is to build a `result` screen to show the returned result from server