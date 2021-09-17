import React from "react";
import QRCodeScanner from "react-native-qrcode-scanner";

export default function Scanner({ navigation }) {

  return (
    <QRCodeScanner
      onRead={e => {
        console.log('data: ', e.data)
        navigation.navigate('Result', { upcID: e.data })
      }}
    />
  );
}