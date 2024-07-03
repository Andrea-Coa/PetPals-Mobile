import React, { useState } from 'react'
import { ImageBackground, View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView, } from 'react-native-safe-area-context';
import {HelperText} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import { postPet } from '../api';
import { Picker } from '@react-native-picker/picker'

export const CreatePetScreen = () => {
    const navigation=useNavigation();
    const [pet, setPet] = useState({
        name: '',
        birthDate: null,
        sex: '',
        breed: '',
        weight: null,
        species: null,
        description: '',

        // IMAGEN POR DEFAULT HASTA QUE VEAMOS CÓMO SUBIR IMÁGENES
        image: 'https://res.cloudinary.com/dp7zuvv8c/image/upload/v1719925435/PetPals/borzqbceaaxxzkjqfgyu?_a=DATAdtAAZAA0',
      });

      // falta esta lógica de SUBMIT
    const handleSubmit = async() => {
        try {
            await postPet(pet);
            console.log('submitted');
            navigation.goBack();

        }
        catch(error) {
            console.error('from create pet screen, failed', error);
        }
    }
    const isNameEmpty = () => {
        return pet.name=='';
    }
    const validateWeight = () => {
        return pet.weight < 0.0;
    }
    const navigateCamera = () => {
        navigation.navigate('Camera');
    }
  return (
    <ImageBackground source={require('../assets/huella-perro.png')} style={styles.background}>
        <SafeAreaView style={styles.container}>
            <ScrollView>
        <Text style={ styles.field }>Nombre</Text>
        <TextInput 
          label='Name'
          style={ styles.box }
          onChangeText={(value) => setPet({...pet, name:value})}
          accessible={true}
          accessibilityLabel="nombre de la mascota"/>
        <HelperText type="error" visible={isNameEmpty()}>Ingresa un nombre válido</HelperText>

        <Text style={ styles.field }>Fecha de nacimiento</Text>
        <TextInput 
            label='Fecha-de-nacimiento'
            style={ styles.box }
            onChangeText={(value) => setPet({...pet, birthDate: value})}
            accessible={true}
            accessibilityLabel="fecha de nacimiento de la mascota"/>

        <Text style={ styles.field }>Sexo</Text>
        <TextInput 
            label='Sexo'
            style={ styles.box }
            onChangeText={(value) => setPet({...pet, sex: value})}
            accessible={true}
            accessibilityLabel="sexo de la mascota"/>

        <Text style={ styles.field }>Especie</Text>
        <Picker
            selectedValue={pet.species}
            style={styles.box}
            onValueChange={(itemValue) => setPet({...pet, species: itemValue})}
            accessible={true}
            accessibilityLabel="especie de la mascota"
            >
            <Picker.Item label="Perro" value="DOG" />
            <Picker.Item label="Gato" value="CAT" />
            <Picker.Item label="Roedor" value="RODENT" />
            <Picker.Item label="Ave" value="BIRD" />
            <Picker.Item label="Otro" value="OTHER" />

            </Picker>

        <Text style={ styles.field }>Raza</Text>
        <TextInput 
            label='Raza'
            style={ styles.box }
            onChangeText={(value) => setPet({...pet, breed: value})}
            accessible={true}
            accessibilityLabel="raza de la mascota"/>

        <Text style={ styles.field }>Peso</Text>
        <TextInput 
            label='Peso'
            keyboardType='numeric'
            style={ styles.box }
            onChangeText={(value) => setPet({...pet, weight: parseFloat(value)})}
            accessible={true}
            accessibilityLabel="peso de la mascota"/>
        <HelperText type="error" visible={validateWeight()}>Ingresa un peso válido</HelperText>

        <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.blackButton} >
              <Text style={styles.buttonText} onPress={navigateCamera}>Toma una foto con la cámara</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.blackButton} >
              <Text style={styles.buttonText}>Sube una foto de tu dispositivo</Text>
          </TouchableOpacity>
        </View>

        <Text style={ styles.field }>Deja una descripción para {pet.name}</Text>
        <TextInput 
            label='Descripcion'
            style={ {...styles.box, height:100} }
            onChangeText={(value) => setPet({...pet, description:value})}
            accessible={true}
            multiline
            accessibilityLabel="descripción de la mascota"/>

        <View style={{flex:1, alignItems:'center', marginTop:8}}>
            <TouchableOpacity style={styles.cyanButton} onPress={handleSubmit}>
                <Text style={ styles.buttonText }>Listo</Text>
            </TouchableOpacity>
        </View>
        </ScrollView>
        </SafeAreaView>

    </ImageBackground>
  );
}


const styles = StyleSheet.create({
    background: {
        flex:1,
        resizeMode:'cover',
    },
    container: {
        padding:24
    },
    field:{
        color:'white',
        marginBottom:4,
        marginLeft:8
    },
    box: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius:10,
        padding:10,
        marginBottom:10
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
        flexWrap:'wrap',
        textAlign:'center'
      },
      buttonContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom:12
      },
      blackButton: {
        backgroundColor: '#000000',
        padding: 10,
        borderRadius: 10,
        width: '45%',
        alignItems: 'center',
        justifyContent: 'center',
        margin:4
      },
      cyanButton: {
        backgroundColor: '#00CED1',
        padding: 10,
        borderRadius: 10,
        width: '45%',
        alignItems: 'center',
        justifyContent: 'center',
        margin:4
      }
})
