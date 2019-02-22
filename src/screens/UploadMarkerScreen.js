import React, { Component } from 'react';
import { AppRegistry, CameraRoll, Dimensions, View, StyleSheet } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { Button } from 'react-native-vector-icons/Ionicons';
import { RNS3 } from 'react-native-aws3';


export class UploadMarkerScreen extends Component {

  takePicture = async function() {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);
      console.log(data.uri);
      const file = {
        uri: data.path,
        name: 'photo.jpg',
        type: 'image/jpeg'
      };

      const uploadOptions = {
        keyPrefix: 'uploads/',
        bucket: 'ar-files-vnovick',
        region: 'eu-west-1',
        accessKey: 'AKIAJMUIC3L4K2A6TGRA',
        secretKey: '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',
        successActionStatus: 201
      };

      RNS3.put(file, uploadOptions).then(response => {
        if (response.status !== 201) {
          throw new Error('Failed to upload image to S3', response);
        }
        console.log('*** BODY ***', response.body);
        alert(JSON.stringify(response.body))
      });
    }
  };


  render() {
    return (
      <View style={styles.container}>
        <RNCamera
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}
          permissionDialogTitle={'Permission to use camera'}
          permissionDialogMessage={'We need your permission to use your camera phone'}
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.cameraContainer}
        />
        <Button
          name="ios-camera-outline"
          size={60}
          backgroundColor="transparent"
          style={{ justifyContent: 'center' }}
          onPress={this.takePicture}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'black'
  },
  preview: {
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimensions.get('window').width,
    width: Dimensions.get('window').width
  },
  cameraContainer: {
    height: Dimensions.get('window').width,
    width: Dimensions.get('window').width,
    backgroundColor: 'salmon'
  }
});