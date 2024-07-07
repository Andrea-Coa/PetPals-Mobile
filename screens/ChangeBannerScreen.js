import React, { startTransition, useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Dimensions, ImageBackground, Text, View, Image, StyleSheet, TouchableOpacity, ScrollView, TouchableHighlight } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { fetchUpdateBannerPhoto } from '../api';
import {CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_PRESET} from '@env';
const screenWidth = Dimensions.get('window').width;

export const ChangeBannerScreen = ({route, navigation}) => {
    const cloudinaryUploadUrl = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload?upload_preset=${CLOUDINARY_PRESET}&api_key=${CLOUDINARY_API_KEY}`;
    const { currentPhoto }= route.params;
    const [newPhoto, setNewPhoto] = useState(null);
    const defaultPhoto = "https://res.cloudinary.com/dp7zuvv8c/image/upload/v1719925435/nagmdobzj6ekxuqjokp2?_a=DATAdtAAZAA0";

    const openGallery = async() =>  {
        try {
          let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality:1
          });
      
          if (!result.canceled) {
            setNewPhoto(result.assets[0].uri);
          }
        } catch (error) {
          console.error('Error opening image library:', error);
        }
      };
      
      const openCamera = async() => {
        try {
          let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4,3],
            quality: 1,
          });
          
          if (!result.canceled) {
            setNewPhoto(result.assets[0].uri);
          }  
        } catch (error) {
          console.error('Error opening camera:', error);
        }
      };
      const handleCancel = () => {
        setNewPhoto(null);
    }
    const handleAccept = async() => {
        const formData = new FormData();
        formData.append('file', {
            uri:newPhoto,
            type:'image/jpeg',
            name:'profile-photo.jpg'
        });
        console.log(newPhoto);

        fetch(cloudinaryUploadUrl, {
            method: 'POST',
            body: formData,
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
            .then(response => response.json())
            .then(responseData => {
              console.log('Imagen subida con éxito a Cloudinary:', responseData);
              return responseData;
            })
            .then(responseData=> {
                setNewPhoto(responseData.url);
            })
            .catch(error => {
              console.error('Error al subir la imagen a Cloudinary:', error);
              setNewPhoto(null);
            });
        if (newPhoto) {
            try {
                console.log('XDDDD', newPhoto);
                await fetchUpdateBannerPhoto({profileImage:newPhoto});
                navigation.reset({
                    index:0,
                    routes: [{ name: 'Profile'}],
                });
            } catch (error) {
                console.error('error updating banner', error);
            }
        }
    }

    return (
        <ImageBackground source={require('../assets/huella-perro.png')} style={{ flex: 1}}>
            <ScrollView>
                <SafeAreaView>
                    {/* <Text style={ styles.title }>Cambiar foto de perfil</Text> */}
                    <View style={ styles.imageContainer }>
                    <Image 
                        source={newPhoto ? {uri: newPhoto} : currentPhoto ? {uri: currentPhoto} : {uri: defaultPhoto}}
                        style={styles.image}
/>
                    </View>
                    <View style={ styles.buttonContainer }>
                        <TouchableOpacity 
                            onPress={openGallery}>
                            <Ionicons name="images" size={44} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity 
                            onPress={openCamera}>
                            <Ionicons name="camera" size={48} color="white" />
                        </TouchableOpacity>
                    </View>
                    { newPhoto &&
                    <View style={ styles.buttonContainer2 }>
                        <TouchableOpacity 
                            style={ styles.cancel }
                            onPress={handleCancel}>
                            <Text style={ styles.buttonText }>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style= {styles.accept}
                            onPress={handleAccept}>
                            <Text style={ styles.buttonText }>Cambiar foto</Text>
                        </TouchableOpacity>
                    </View>}
                </SafeAreaView>
            </ScrollView>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    title:{
        color:'white',
        fontSize:24,
        paddingHorizontal:30,
        fontWeight:'semi-bold'
    },
    imageContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: screenWidth * 0.6, // adjust this value as needed
        marginVertical: 20,
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    buttonContainer: {
        flexDirection: 'row', 
        justifyContent: 'space-around', 
        marginVertical: 20,
    },
    buttonContainer2: {
        flexDirection: 'row',
        justifyContent: 'space-evenly', 
        marginVertical: 20,
    },
    cancel: {
        marginTop: 30,
        borderColor: '#00CED1',
        borderWidth: 1,
        backgroundColor: 'transparent',
        paddingVertical: 10,
        width:'40%',
        borderRadius: 10,
        alignItems:'center'
    }, 
    accept: {
        marginTop: 30,
        backgroundColor: '#00CED1',
        paddingVertical: 10,
        borderRadius: 10,
        width:'40%',
        alignItems:'center'
    },
    buttonText: {
        color:'white'
    }
});