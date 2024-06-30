import React from 'react';
import { StyleSheet, View, Text, ImageBackground } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import CustomButton from '../components/CustomButton';

// Importa la imagen
const bgImage = require('../assets/dog_bg.png');

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaProvider>
      <ImageBackground source={bgImage} style={styles.background}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerText}>What’s up Pals</Text>
          </View>

          <View style={styles.separatorContainer}>
            <View style={styles.line} />
            <Text style={styles.separatorText}>or</Text>
            <View style={styles.line} />
          </View>

          <View style={styles.buttonContainer}>
            <CustomButton
              title="Sign Up"
              onPress={() => navigation.navigate('Register')}
            />
            <CustomButton
              title="Sign In"
              onPress={() => navigation.navigate('Login')}
            />
          </View>
        </View>
      </ImageBackground>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover', // Esto asegura que la imagen cubra toda la pantalla
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(130, 46, 169, 0.6)', // Fondo morado con transparencia para superponer la imagen
  },
  header: {
    backgroundColor: 'rgba(128, 0, 128, 0.7)', // Fondo morado con transparencia para el encabezado
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
    paddingBottom: 20,
  },
  headerText: {
    color: '#FFFFFF',
    fontSize: 36,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  separatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    width: '70%',
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#FFFFFF',
  },
  separatorText: {
    marginHorizontal: 10,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});
