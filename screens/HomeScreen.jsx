import React from 'react';
import { StyleSheet, View, Text, ImageBackground } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import CustomButton from '../components/CustomButton';
import { Ionicons } from '@expo/vector-icons';

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

          <View style={styles.buttonContainer}>
            <CustomButton
              title="Google"
              onPress={() => {}}
              icon="logo-google"
            />
            <View style={styles.separatorContainer}>
              <View style={styles.line} />
              <Text style={styles.separatorText}>or</Text>
              <View style={styles.line} />
            </View>
            <CustomButton
              title="Sign In"
              onPress={() => navigation.navigate('Login')}
              icon="person-outline"
            />
            <Text style={styles.footerText}>
              Don't have an account? <Text style={styles.linkText} onPress={() => navigation.navigate('Register')}>Sign Up</Text>
            </Text>
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
    backgroundColor: 'transparent', // Hace que el fondo del encabezado sea transparente
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
    marginVertical: 70, // Aumenta el margen vertical para mayor separación
    width: '70%',
  },
  line: {
    flex: 1,
    height: 2, // Aumenta la altura de la línea para que sea más gruesa
    backgroundColor: '#FFFFFF',
  },
  separatorText: {
    marginHorizontal: 20, // Aumenta el margen horizontal para mayor separación
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 18, // Aumenta el tamaño del texto para "Or"
  },
  footerText: {
    color: '#FFFFFF',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 100,
  },
  linkText: {
    color: '#00CED1',
    textDecorationLine: 'underline',
  },
});
