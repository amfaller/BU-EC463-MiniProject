# FoodWhiz

Yuxuan Luo and Tony Faller

EC463: Senior Design Fall 2021

## Summary

This repository contains the codebase for an Android app developed using React Native and Google Firebase. This app allows for the user to enter a Universal Product Number code (UPC ID). When entered, the app queries the [FDA API](https://fdc.nal.usda.gov/api-guide.html) and compiles an ingredient list and a total calorie count. 

## Getting Started

1. First, ensure that your React Native development environment is properly set up. Instructions may be found [here](https://reactnative.dev/docs/environment-setup). 
2. Then, open `./screens/UPCID.js` and enter your FDA API key.
3. Navigate to the root directory and run `npm install` to install the required dependencies.
4. Connect a physical Android device via USB or run an Android emulator.
5. Start the app with `npx react-native run-android`.

## Further reference

This app was developed over the course of a few weeks, and a log of our progress can be found in the `./log/log.md` file. 

There were a handful of specific features that we were unable to implement; a description of these may be found in `report.md`. 

----
