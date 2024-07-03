import React, { useEffect, useRef, useState } from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';


export const CustomCamera = () => {
    const [image, setImage] = useState(null);
    const [facing, setFacing] = useState('back');
    const [permission, requestPermission] = useCameraPermissions();
    const cameraRef=useRef(null);

    const toggleCameraFacing= () => {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    }

    const takePicture = async() => {
        if (cameraRef) {
            try {
                const data = await cameraRef.current.takePictureAsync();
                console.log(data);
                setImage(data.uri);
            } catch (error) {
                console.error("AAAA", error);
            }
        }
    }

    if (!permission) {
        return <Text>No hay permiso para usar la cámara.</Text>
    }

    if (!permission.granted) {
        return (
          <View style={styles.container}>
            <Text style={{ textAlign: 'center' }}>Necesitamos permiso para usar tu cámara</Text>
            <Button onPress={requestPermission} title="grant permission" />
          </View>
        );
      }

    return (
        <View style={styles.container}>
          <CameraView 
            style={styles.camera} 
            facing={facing}
            ref={cameraRef}>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
                <Ionicons name="camera-reverse-sharp" size={32} color="white" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={takePicture}>
                <Ionicons name="camera" size={32} color="white" />
              </TouchableOpacity>
            </View>
          </CameraView>
        </View>
      );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
    },
    camera: {
      flex: 1,
    },
    buttonContainer: {
      flex: 1,
      flexDirection: 'row',
      backgroundColor: 'transparent',
      margin: 64,
    },
    button: {
      flex: 1,
      alignSelf: 'flex-end',
      alignItems: 'center',
    },
    text: {
      fontSize: 24,
      fontWeight: 'bold',
      color: 'white',
    },
  });
  