import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Importa la imagen de fondo (ajusta la ruta según sea necesario)
const bgImage = require('../assets/huella-perro.png');

export default function CreateActivityScreen({ navigation }) {
  const handleCreate = () => {
    // Lógica para manejar la creación de la actividad
    console.log('Create Activity button pressed');
  };

  return (
    <SafeAreaProvider>
      <ImageBackground source={bgImage} style={styles.background}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Create Activity</Text>
          </View>

          {/* Contenido de la pantalla para crear la actividad */}
          <View style={styles.content}>
            <Text style={styles.infoText}>Screen for Create Activity</Text>
          </View>

          <TouchableOpacity style={styles.button} onPress={handleCreate}>
            <Text style={styles.buttonText}>Create</Text>
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
    top: 50,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  headerText: {
    fontSize: 36,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  content: {
    marginTop: 150,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoText: {
    fontSize: 20,
    color: '#FFFFFF',
    marginBottom: 20,
  },
  button: {
    marginTop: 30,
    backgroundColor: '#00CED1',
    paddingVertical: 20,
    paddingHorizontal: 110,
    borderRadius: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
