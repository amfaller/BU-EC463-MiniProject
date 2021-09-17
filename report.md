# FoodWhiz Report

Yuxuan Luo and Tony Faller

EC463: Senior Design Fall 2021

## Summary

This repository contains the codebase for an Android app developed using React Native and Google Firebase. This app allows for the user to enter a Universal Product Number code (UPC ID). When entered, the app queries the [FDA API](https://fdc.nal.usda.gov/api-guide.html) and compiles an ingredient list and a total calorie count. 

On an FDA Query, the returned JSON is stored directly in a Firebase Firestore Database. When the user wishes to see their recipe, the database is read and parsed on the client side.

### Implemented Features

1. Robust GUI
2. Utilization of FDA REST API via user-input UPC ID
3. Barcode scanner
4. Google Authentication
5. Firebase Firestore Database read/write capabilities

### Non-implemented Features

1. Barcode scanner is not connected to the FDA API (UPC IDs must be manually typed) 
2. User cannot switch between recipes
3. User cannot input number of servings after each scan
4. Recipes are global as opposed to per-user

## Learning Process

Neither Yuxuan nor Tony had performed mobile app development before, and as an extension, had never used React Native or Firebase before. Since there was so much to learn, a fair bit of the alotted time was spent reading documentation and creating test projects. 

We began by trying to use Expo for development, and that worked quickly; we got a decent amount done before we realized that the Native package for Firebase is incompatible with an Expo-created project. We had to switch gears about halfway through our timeframe to use the React Native CLI. After this change, Firebase integrated well.

After this, we spent our time trying to implement the core features of the app. We ran into a few snags that slowed us down; in particular, certain issues with implementing the database reads/writes come to mind. We unfortunately did not have time to perfect the functionality of the app - even though there is Google Authentication, recipes are still shared across all users. There is also no way for the user to swap between recipes; the GUI capability is there, but the backend support is not. 

## Future Improvements

Of course, there is always room for improvement. If we had more time to work on this project, we would implement the features that we did not have time to support. Now that we have some experience with mobile development, we believe that such implementations would not require too much of a lift in terms of code; they will, however, require some time.

There are also some specific React Native features we would like to use to help organize our code. One is the ability to pass a function as a `prop` so that functions would be available beyond their file. Another is the ability to dynamically pass data between screens without the use of a database or another external storage source.

## Supporting Artifacts

[Link to demo video]()

## Modules, Tools, Source Used Including Attribution

All references may be found in `./log/log.md`.

----
