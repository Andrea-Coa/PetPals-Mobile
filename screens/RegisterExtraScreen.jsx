import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ImageBackground, Alert } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchRegister } from '../api';

// Importa la imagen de fondo
const bgImage = require('../assets/huella-perro.png');

export default function RegisterExtraScreen({ route, navigation }) {
  const { name, email, password } = route.params;
  const [isCompany, setIsCompany] = useState(false);
  const [ruc, setRuc] = useState('');

  const handleRegister = async () => {
    if (isCompany && (ruc.length < 8 || ruc.length > 11)) {
      Alert.alert('Error', 'RUC must be between 8 and 11 digits');
      return;
    }
    try {
      const response = await fetchRegister(name, email, password, isCompany, ruc);
      if (response.status === 200) {
        const token = response.data.token;
        console.log('Token:', token); // Imprime el token en la consola
        await AsyncStorage.setItem('token', token);
        Alert.alert('Success', 'User registered successfully');
        // Redirigir a la pantalla de inicio de sesión
        navigation.navigate('Login');
      }
    } catch (error) {
      if (error.response) {
        Alert.alert('Error', `Error: ${error.response.data.message || error.response.status}`);
        console.error('Error response:', error.response.data);
      } else if (error.request) {
        Alert.alert('Error', 'No response received from server');
        console.error('Error request:', error.request);
      } else {
        Alert.alert('Error', `Error: ${error.message}`);
        console.error('Error message:', error.message);
      }
    }
  };
  

  return (
    <SafeAreaProvider>
      <ImageBackground source={bgImage} style={styles.background}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Sign Up</Text>
          </View>

          <View style={styles.pickerContainer}>
            <View style={styles.labelContainerWide}>
              <Text style={styles.labelText}>Tipo de cuenta:</Text>
            </View>

            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={isCompany}
                style={styles.picker}
                onValueChange={(itemValue) => setIsCompany(itemValue === 'true')}
              >
                <Picker.Item label="Usuario" value="false" />
                <Picker.Item label="Compañia" value="true" />
              </Picker>
            </View>
          </View>

          {isCompany && (
            <View style={styles.inputContainer}>
              <View style={styles.labelContainer}>
                <Text style={styles.labelText}>RUC</Text>
              </View>
              <TextInput
                style={styles.input}
                value={ruc}
                onChangeText={setRuc}
                placeholder="RUC"
              />
            </View>
          )}

          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'rgba(130, 46, 169, 0.6)', // Fondo morado con transparencia
  },
  header: {
    position: 'absolute',
    top: 50, // Ajusta esta propiedad según sea necesario
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  headerText: {
    fontSize: 36,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  pickerContainer: {
    width: '100%',
    marginVertical: 40, // Ajusta el margen vertical para evitar que se mezcle con RUC
    position: 'relative',
  },
  pickerWrapper: {
    height: 110, // Ajusta la altura del cuadro de la ruleta
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    overflow: 'hidden',
    width: '100%',
    justifyContent: 'center',
  },
  picker: {
    height: 215,
    width: '100%',
    color: '#000000',
  },
  labelContainerWide: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 40, // Aumenta el ancho de la etiqueta
    marginBottom: 10, // Aumenta el espacio entre el label y la ruleta
    width: '70%',
    alignItems: 'center',
    alignSelf: 'center', // Centra horizontalmente en la pantalla
  },
  labelContainer: {
    position: 'absolute',
    top: -12,
    left: 15,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    zIndex: 1,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: 120,
    alignItems: 'center',
  },
  labelText: {
    color: '#000000',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  inputContainer: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginVertical: 25,
    paddingHorizontal: 10,
    paddingVertical: 5,
    position: 'relative',
    height: 60,
  },
  input: {
    height: 35,
    color: '#000',
    marginTop: 10,
    backgroundColor: '#FFFFFF', // Fondo blanco para el cuadro de texto
  },
  button: {
    marginTop: 90, // Baja el botón para que esté más abajo
    backgroundColor: '#00CED1',
    paddingVertical: 20, // Incrementa el tamaño del botón verticalmente
    paddingHorizontal: 110, // Incrementa el tamaño del botón horizontalmente
    borderRadius: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
