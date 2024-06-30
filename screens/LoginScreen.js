import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Importa la imagen de fondo
const bgImage = require('../assets/huella-perro.png');

export default function SignUpScreen({ navigation }) {
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
            <TextInput style={styles.input} />
          </View>

          <View style={styles.inputContainer}>
            <View style={styles.labelContainer}>
              <Text style={styles.labelText}>Password</Text>
            </View>
            <TextInput style={styles.input} secureTextEntry />
          </View>

          <TouchableOpacity style={styles.button} onPress={() => { /* Handle Sign Up */ }}>
            <Text style={styles.buttonText}>Continue</Text>
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
  inputContainer: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginVertical: 25, // Incrementa la separación entre los bloques de texto
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
    marginTop: 10,
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
});
