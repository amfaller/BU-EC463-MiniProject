import React from "react";
import { RNCamera } from "react-native-camera";
import QRCodeScanner from "react-native-qrcode-scanner";

export default class Scanner extends React.Component {
  onSuccess = e => {
    console.log('e: ', e)
    console.log('data: ', e.data)
  };

  render() {
    return (
      <QRCodeScanner
        onRead={this.onSuccess}
      />
    );
  }
}