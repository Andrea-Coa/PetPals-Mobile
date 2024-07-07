import React, { useState, useEffect, useRef } from 'react';
import { Text, View, ImageBackground, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { HelperText } from 'react-native-paper';
import { PetCard } from '../components/PetCard';
import { CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_PRESET } from '@env';
import { postPet } from '../api';
import { useNavigation } from '@react-navigation/native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

async function sendPushNotification(expoPushToken) {
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: 'Original Title',
    body: 'And here is the body!',
    data: { someData: 'goes here' },
  };

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
}

function handleRegistrationError(errorMessage) {
  alert(errorMessage);
  throw new Error(errorMessage);
}

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      handleRegistrationError('Permission not granted to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync({
      projectId: Constants.expoConfig.extra.eas.projectId,
    })).data;
    console.log("Este es el PushToken", token);
  } else {
    handleRegistrationError('Must use physical device for push notifications');
  }

  return token;
}

async function requestCameraPermissions() {
  const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
  const { status: mediaLibraryStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  
  if (cameraStatus !== 'granted' || mediaLibraryStatus !== 'granted') {
    Alert.alert('Permission not granted', 'Camera and media library permissions are required to use this feature.');
  }
}

export const NewPetForm = ({ petImage }) => {
  const navigation = useNavigation();
  const cloudinaryUploadUrl = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload?upload_preset=${CLOUDINARY_PRESET}&api_key=${CLOUDINARY_API_KEY}`;
  const [pet, setPet] = useState({
    name: '',
    birthDate: null,
    sex: '',
    breed: '',
    weight: null,
    species: null,
    description: '',
    image: null
  });

  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    setPet(prevPet => ({ ...prevPet, image: petImage }));
  }, [petImage]);

  useEffect(() => {
    registerForPushNotificationsAsync()
      .then(token => setExpoPushToken(token))
      .catch((error) => setExpoPushToken(`${error}`));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      notificationListener.current && Notifications.removeNotificationSubscription(notificationListener.current);
      responseListener.current && Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('file', {
      uri: petImage,
      type: 'image/jpeg',
      name: 'photo.jpg',
    });

    try {
      const response = await fetch(cloudinaryUploadUrl, {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const responseData = await response.json();
      setPet(prevPet => ({ ...prevPet, image: responseData.url }));

      await postPet(pet);
      await sendPushNotification(expoPushToken);
      navigation.reset({
        index: 0,
        routes: [{ name: 'PetFeed' }],
      });
    } catch (error) {
      console.error('from create pet screen, failed', error);
    }
  };

  const isNameEmpty = () => pet.name === '';
  const validateWeight = () => pet.weight <= 0.0;

  const isFormComplete = () => {
    return pet.name && pet.birthDate && pet.sex && pet.breed && pet.weight && pet.species && pet.description && pet.image;
  };

  return (
    <View>
      <Text style={styles.field}>Nombre</Text>
      <TextInput
        label='Name'
        style={styles.box}
        onChangeText={(value) => setPet({ ...pet, name: value })}
        accessible={true}
        accessibilityLabel="nombre de la mascota"
      />
      <HelperText type="error" visible={isNameEmpty()}>Ingresa un nombre válido</HelperText>

      <Text style={styles.field}>Fecha de nacimiento</Text>
      <TextInput
        label='Fecha-de-nacimiento'
        style={styles.box}
        onChangeText={(value) => setPet({ ...pet, birthDate: value })}
        accessible={true}
        accessibilityLabel="fecha de nacimiento de la mascota"
      />
      <Text style={styles.field}>Sexo de la mascota</Text>
      <Picker
        selectedValue={pet.sex}
        style={styles.picker} // Usar estilos específicos para el Picker
        itemStyle={{ height: 160, marginTop: -20, paddingTop: 100  }} // Ajusta `marginTop` para alinear la parte superior de los ítems con el cuadro blanco
        onValueChange={(itemValue) => setPet({ ...pet, sex: itemValue })}
        accessible={true}
      >
        <Picker.Item label="Hembra" value="FEMALE" />
        <Picker.Item label="Macho" value="MALE" />
      </Picker>

      <Text style={styles.field}>Especie de la mascota</Text>
      <Picker
        selectedValue={pet.species}
        style={styles.picker} // Usar estilos específicos para el Picker
        itemStyle={{ height: 160, marginTop: -20, paddingTop: 100  }} // Ajusta `marginTop` para alinear la parte superior de los ítems con el cuadro blanco
        onValueChange={(itemValue) => setPet({ ...pet, species: itemValue })}
        accessible={true}
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
        accessibilityLabel="raza de la mascota"
      />

      <Text style={styles.field}>Peso</Text>
      <TextInput
        label='Peso'
        keyboardType='numeric'
        style={styles.box}
        onChangeText={(value) => setPet({ ...pet, weight: parseFloat(value) })}
        accessible={true}
        accessibilityLabel="peso de la mascota"
      />
      <HelperText type="error" visible={validateWeight()}>Ingresa un peso válido</HelperText>

      <Text style={styles.field}>Deja una descripción para {pet.name}</Text>
      <TextInput
        label='Descripcion'
        style={{ ...styles.box, height: 100 }}
        onChangeText={(value) => setPet({ ...pet, description: value })}
        accessible={true}
        multiline
        accessibilityLabel="descripción de la mascota"
      />

      <View style={{ flex: 1, width: '50%', justifyContent: 'center' }}>
        <Text style={styles.buttonText}>Preview de la mascota</Text>
        <PetCard pet={pet} />
      </View>

      <View style={{ flex: 1, alignItems: 'center', marginTop: 8 }}>
        <TouchableOpacity 
          style={[styles.cyanButton, { opacity: isFormComplete() ? 1 : 0.5 }]} 
          onPress={handleSubmit} 
          disabled={!isFormComplete()}
        >
          <Text style={styles.buttonText}>Listo</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

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
  },
  picker: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
    height: 120, // Ajusta la altura del cuadro blanco
    marginBottom: 10,
  }
});
