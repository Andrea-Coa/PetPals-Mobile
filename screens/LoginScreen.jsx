import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert, ImageBackground } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { fetchLogin } from '../api';
import * as SecureStore from 'expo-secure-store'

// Importa la imagen de fondo
const bgImage = require('../assets/huella-perro.png');

export default function LoginScreen({ navigation, route }) {
  const { fromRegisterExtra } = route.params || {};
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    try {
      const response = await fetchLogin(email, password);
      if (response.status === 200) {
        const token = response.data.token;
        await SecureStore.setItemAsync('token', token);
        Alert.alert('Success', 'Logged in successfully');

        // Navegar a la pantalla principal o la que desees después del login
        navigation.reset({
          index: 0,
          routes: [{ name: 'NavigationTabs' }],
        });
      }

    } catch (error) {
      if (error.response) {
        // Handle specific error status codes
        let errorMessage = 'Error:';
        if (error.response.status === 403) {
          errorMessage = 'Contraseña incorrecta';
        } else if (error.response.status === 404) {
          errorMessage = 'Correo no registrado';
        } else {
          errorMessage = `Error: ${error.response.data.message || error.response.status}`;
        }
    
        // Show the alert with the specific error message
        Alert.alert('Error', errorMessage);
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
            <Text style={styles.headerText}>Sign In</Text>
          </View>

          <View style={styles.inputContainer}>
            <View style={styles.labelContainer}>
              <Text style={styles.labelText}>Email</Text>
            </View>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Email"
              keyboardType="email-address"
            />
          </View>

          <View style={styles.inputContainer}>
            <View style={styles.labelContainer}>
              <Text style={styles.labelText}>Password</Text>
            </View>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                placeholder="Password"
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
                <Ionicons name={showPassword ? 'eye' : 'eye-off'} size={24} color="black" />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>

          {fromRegisterExtra && (
            <TouchableOpacity style={styles.homeButton} onPress={() => navigation.reset({ index: 0, routes: [{ name: 'Home' }] })}>
              <Text style={styles.homeButtonText}>Back to Home</Text>
            </TouchableOpacity>
          )}
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
    paddingTop: 60, // Agrega un padding superior para bajar los cuadros de texto
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
  inputContainer: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginVertical: 50, // Incrementa la separación entre los bloques de texto
    paddingHorizontal: 10,
    paddingVertical: 5,
    position: 'relative',
    height: 60, // Ajusta esta propiedad según sea necesario
  },
  labelContainer: {
    position: 'absolute',
    top: -12,
    left: 15,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20, // Asegura que el cuadro de la etiqueta sea lo suficientemente ancho
    zIndex: 1,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: 120, // Ancho fijo para todas las etiquetas
    alignItems: 'center', // Asegura que el texto esté centrado en el cuadro
  },
  labelText: {
    color: '#000000',
    fontSize: 16,
    textAlign: 'center', // Centra el texto dentro del cuadro
    fontWeight: 'bold', // Hace que el texto esté en negrita
  },
  input: {
    height: 35,
    color: '#000',
    marginTop: 5,
    flex: 1,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginTop: 5,
  },
  eyeIcon: {
    position: 'absolute',
    right: 10, // Ajusta la posición del icono si es necesario
    top: '50%',
    transform: [{ translateY: -12 }],
  },
  button: {
    marginTop: 100, // Baja el botón para que esté más abajo
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
  homeButton: {
    marginTop: 20, // Ajusta el margen superior según sea necesario
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  homeButtonText: {
    color: '#000000',
    fontSize: 16,
  },
});
