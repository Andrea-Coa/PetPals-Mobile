import React, { useState } from 'react';
import { ImageBackground, View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Image, Button } from 'react-native';
import { SafeAreaView, } from 'react-native-safe-area-context';
import { HelperText } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { postPet } from '../api';
import { NewPetForm } from '../components/NewPetForm';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';

/* 
    PANTALLA PARA CREAR MASCOTA
    Contiene:
    - Formulario para rellenar datos de la mascota
    - Botones para elegir una foto:
      - Cámara o
      - Elegir de galería
*/

export const CreatePetScreen = () => {
    const navigation = useNavigation();
    const [image, setImage] = useState(null);

    const openGallery = async() =>  {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    };
    console.log(image);

    const openCamera = async() => {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [3,3],
        quality: 1,
      });
      
      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }  
    };

    return (
        <ImageBackground source={require('../assets/huella-perro.png')} style={styles.background}>
          <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
              
                <View style={styles.header}>
                  <Text style={styles.title}>Agrega una mascota</Text>
                  <Text style={styles.description}>¡Ayuda a una mascota a encontrar un hogar pronto! Asegúrate de agregar una descripción detallada para que los futuros dueños puedan conocerla mejor. Cada detalle cuenta para encontrar el hogar perfecto para tu mascota.</Text>
                </View>

                <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.blackButton} onPress={openCamera}>
                  <Text style={styles.buttonText}>Toma una foto con la cámara</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.blackButton} onPress={openGallery}>
                  <Text style={styles.buttonText}>Sube una foto de tu dispositivo</Text>
                </TouchableOpacity>
                </View>

                {image && (
                  <View style={{ width: 160, flexDirection:'row', height: 40, backgroundColor:'#fff', borderRadius:4, alignItems:'center', marginBottom:8 }}>
                    <Image
                      source={{ uri: image }}
                      style={{ width: '30%', height:'90%', margin:1 }}
                    />
                    <Text style={{fontSize:10, width:'40%', padding:2, margin:6}}>Imagen seleccionada</Text>
                    <TouchableOpacity
                      onPress={() => setImage(null)}
                      style={{ backgroundColor: 'transparent'}}
                    >
                      <Ionicons name="trash" size={24} color="black" />
                    </TouchableOpacity>
                  </View>
                )}

                <NewPetForm petImage={image}/>


            </ScrollView>
          </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    paddingHorizontal: 24
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    flexWrap: 'wrap',
    textAlign: 'center'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12
  },
  blackButton: {
    backgroundColor: '#000000',
    padding: 10,
    borderRadius: 10,
    width: '45%',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 4
  },
  cyanButton: {
    backgroundColor: '#00CED1',
    padding: 10,
    borderRadius: 10,
    width: '45%',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 4
  },
  header: {
    paddingBottom:8
  },
  title: {
    color:'white',
    fontSize:32,
    fontWeight:'bold'
  }, 
  description: {
    color:'white'
  }
});
