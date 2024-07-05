import { Text, View, ImageBackground, StyleSheet, TouchableOpacity,TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useEffect, useState } from 'react';
import {HelperText }from 'react-native-paper'
import { PetCard } from '../components/PetCard';
import {CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_PRESET} from '@env';
import { postPet } from '../api';
import {useNavigation} from '@react-navigation/native';

import React from 'react'

export const NewPetForm = ({petImage}) => {
  const navigation=useNavigation();
  const cloudinaryUploadUrl = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload?upload_preset=${CLOUDINARY_PRESET}&api_key=${CLOUDINARY_API_KEY}`;
  const [pet, setPet] = useState({
        name: '',
        birthDate: null,
        sex: '',
        breed: '',
        weight: null,
        species: null,
        description: '',
        image:null
        });
    useEffect(()=> {
      setPet(prevPet => ({ ...prevPet, image: petImage }));
      }, [petImage]);

console.log(CLOUD_NAME);
    
  const handleSubmit = async () => {
    const formData = new FormData();
      formData.append('file', {
        uri: petImage,
        type: 'image/jpeg',
        name: 'photo.jpg',
      });
      console.log(petImage)
    try {

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
          setPet({...pet, image:responseData.url});
        })
        .catch(error => {
          console.error('Error al subir la imagen a Cloudinary:', error);
        });

      await postPet(pet);
      console.log('saved uri', pet.image);
      navigation.reset({
        index: 0,
        routes: [{ name: 'PetFeed' }],
      });
    } catch (error) {
      console.error('from create pet screen, failed', error);
    }
  };
console.log('PETIMAG', pet.image);
  const isNameEmpty = () => {
    return pet.name == '';
  };

  const validateWeight = () => {
    return pet.weight < 0.0;
  };

    return (
        <View>
        <Text style={styles.field}>Nombre</Text>
          <TextInput
            label='Name'
            style={styles.box}
            onChangeText={(value) => setPet({ ...pet, name: value })}
            accessible={true}
            accessibilityLabel="nombre de la mascota" />
          <HelperText type="error" visible={isNameEmpty()}>Ingresa un nombre válido</HelperText>

          <Text style={styles.field}>Fecha de nacimiento</Text>
          <TextInput
            label='Fecha-de-nacimiento'
            style={styles.box}
            onChangeText={(value) => setPet({ ...pet, birthDate: value })}
            accessible={true}
            accessibilityLabel="fecha de nacimiento de la mascota" />

          <Text style={styles.field}>Sexo</Text>
          <TextInput
            label='Sexo'
            style={styles.box}
            onChangeText={(value) => setPet({ ...pet, sex: value })}
            accessible={true}
            accessibilityLabel="sexo de la mascota" />

          <Text style={styles.field}>Especie</Text>
          <Picker
            selectedValue={pet.species}
            style={styles.box}
            onValueChange={(itemValue) => setPet({ ...pet, species: itemValue })}
            accessible={true}
            accessibilityLabel="especie de la mascota"
          >
            <Picker.Item label="Perro" value="DOG" />
            <Picker.Item label="Gato" value="CAT" />
            <Picker.Item label="Roedor" value="RODENT" />
            <Picker.Item label="Ave" value="BIRD" />
            <Picker.Item label="Otro" value="OTHER" />

          </Picker>

          <Text style={styles.field}>Raza</Text>
          <TextInput
            label='Raza'
            style={styles.box}
            onChangeText={(value) => setPet({ ...pet, breed: value })}
            accessible={true}
            accessibilityLabel="raza de la mascota" />

          <Text style={styles.field}>Peso</Text>
          <TextInput
            label='Peso'
            keyboardType='numeric'
            style={styles.box}
            onChangeText={(value) => setPet({ ...pet, weight: parseFloat(value) })}
            accessible={true}
            accessibilityLabel="peso de la mascota" />
          <HelperText type="error" visible={validateWeight()}>Ingresa un peso válido</HelperText>

          <Text style={styles.field}>Deja una descripción para {pet.name}</Text>
          <TextInput
            label='Descripcion'
            style={{ ...styles.box, height: 100 }}
            onChangeText={(value) => setPet({ ...pet, description: value })}
            accessible={true}
            multiline
            accessibilityLabel="descripción de la mascota" />

          <View style={{flex:1, width:'50%', justifyContent:'center'}}>
            <Text style={styles.buttonText}>Preview de la mascota</Text>
            <PetCard pet={pet} />
          </View>

            <View style={{ flex: 1, alignItems: 'center', marginTop: 8 }}>
            <TouchableOpacity style={styles.cyanButton} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Listo</Text>
            </TouchableOpacity>
          </View>

        </View>
    );
}

const styles = StyleSheet.create({
    background: {
      flex: 1,
      resizeMode: 'cover',
    },
    container: {
      padding: 24
    },
    field: {
      color: 'white',
      marginBottom: 4,
      marginLeft: 8
    },
    box: {
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      borderRadius: 10,
      padding: 10,
      marginBottom: 10
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
    }
  });
  