import React, { useState, useEffect } from 'react';
import { ImageBackground, View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Alert, Platform, Button, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker'; // Asegúrate de tener instalado y correctamente importado el Picker
import { fetchCreateActivity } from '../api';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import {CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_PRESET} from '@env';

const bgImage = require('../assets/huella-perro.png');

export default function CreateActivityScreen() {
  const cloudinaryUploadUrl = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload?upload_preset=${CLOUDINARY_PRESET}&api_key=${CLOUDINARY_API_KEY}`;
  const navigation = useNavigation();
  const route = useRoute();
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [localImage, setLocalImage] = useState(null);
  const [activity, setActivity] = useState({
    name: '',
    startDate: new Date(),
    endDate: new Date(),
    activityType: '',
    location: {
      address: '',
      latitude: 0., // Default positive latitude
      longitude: 0., // Default positive longitude
    },
    image: 'https://res.cloudinary.com/dp7zuvv8c/image/upload/v1719925435/PetPals/borzqbceaaxxzkjqfgyu?_a=DATAdtAAZAA0',
  });

  const onStartDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || activity.startDate;
    setShowStartDatePicker(Platform.OS === 'ios');
    setActivity({ ...activity, startDate: currentDate });
  };
  
  const onEndDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || activity.endDate;
    setShowEndDatePicker(Platform.OS === 'ios');
    setActivity({ ...activity, endDate: currentDate });
  };

  useEffect(() => {
    if (route.params?.photoUri) {
      setActivity({ ...activity, image: route.params.photoUri });
    }
  }, [route.params?.photoUri]);

  const handleSubmit = async () => {
    const formData = new FormData();
      formData.append('file', {
        uri: localImage,
        type: 'image/jpeg',
        name: 'photo.jpg',
      });
      console.log(localImage);

    if (!activity.name || !activity.startDate || !activity.endDate || !activity.activityType || !activity.location.address) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
      const response = await fetch(cloudinaryUploadUrl, {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    
      const responseData = await response.json();
      console.log(responseData);

      const newActivity = {
        ...activity,
        startDate: activity.startDate.toISOString().split('T')[0],
        endDate: activity.endDate.toISOString().split('T')[0],
        image: responseData.url
      };
      console.log(newActivity);
      // console.log('Imagen subida con éxito a Cloudinary:', responseData);
      // console.log("JSON enviado:", JSON.stringify(newActivity, null, 2));
    
      // // setActivity({...activity, image:responseData.url});
      await fetchCreateActivity(newActivity);
      // Alert.alert('Success', 'Activity created successfully');
      navigation.navigate('Eventos', { reload: true });
    } catch (error) {
      Alert.alert('Error', `There was a problem creating the activity: ${error.message}`);
    }
  };


    const openGallery = async() =>  {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality:1
      });

      if (!result.canceled) {
        setLocalImage(result.assets[0].uri);
      }
    };
    console.log(localImage);

    const openCamera = async() => {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [3,3],
        quality: 1,
      });
      
      if (!result.canceled) {
        setLocalImage(result.assets[0].uri);
      }  
    };

  return (
    <ImageBackground source={bgImage} style={styles.background}>
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={styles.inputContainer}>
            <View style={styles.labelContainer}>
              <Text style={styles.labelText}>Nombre</Text>
            </View>
            <TextInput
              style={styles.input}
              placeholder="Enter activity name"
              value={activity.name}
              onChangeText={(value) => setActivity({ ...activity, name: value })}
            />
          </View>

          <View style={styles.inputContainer}>
            <View style={styles.labelContainer}>
              <Text style={styles.labelText}>Fecha de inicio</Text>
            </View>
            {/* <DateTimePicker
              value={activity.startDate}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => setActivity({ ...activity, startDate: selectedDate || activity.startDate })}
              style={styles.datePicker}
            /> */}
            {Platform.OS === 'android' && (
              <Button title="Select Start Date" onPress={() => setShowStartDatePicker(true)} />
            )}

            {showStartDatePicker && (
              <DateTimePicker
                value={activity.startDate}
                mode={'date'}
                display={Platform.OS === 'android' ? 'calendar' : 'spinner'}
                onChange={onStartDateChange}
              />
            )}
          </View>

          <View style={styles.inputContainer}>
            <View style={styles.labelContainer}>
              <Text style={styles.labelText}>Fecha de fin</Text>
            </View>
            {Platform.OS === 'android' && (
              <Button title="Select End Date" onPress={() => setShowEndDatePicker(true)} />
            )}

            {showEndDatePicker && (
              <DateTimePicker
                value={activity.endDate}
                mode={'date'}
                display={Platform.OS === 'android' ? 'calendar' : 'spinner'}
                onChange={onEndDateChange}
              />
            )}
          </View>

          <View style={styles.inputContainer}>
            <View style={styles.labelContainer}>
              <Text style={styles.labelText}>Tipo de actividad</Text>
            </View>

            <View style={[styles.input, { justifyContent: 'center', height: 180 }]}>
              <Picker
                selectedValue={activity.activityType}
                style={{ height: 200, marginTop: -20 }}  // Ajusta el marginTop para mover los ítems hacia arriba
                onValueChange={(itemValue) => setActivity({ ...activity, activityType: itemValue })}
              >
                <Picker.Item label="Vaccination Campaign" value="VACCINATION_CAMPAIGN" />
                <Picker.Item label="Adoption Campaign" value="ADOPTION_CAMPAIGN" />
                <Picker.Item label="Limited Discount" value="LIMITED_DISCOUNT" />
                <Picker.Item label="Pet Contest" value="PET_CONTEST" />
                <Picker.Item label="Workshop" value="WORKSHOP" />
                <Picker.Item label="Other" value="OTHER" />
              </Picker>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <View style={styles.labelContainer}>
              <Text style={styles.labelText}>Ubicación</Text>
            </View>
            <TextInput
              style={styles.input}
              placeholder="Enter location address"
              value={activity.location.address}
              onChangeText={(value) => setActivity({ ...activity, location: { ...activity.location, address: value } })}
            />
          </View>

          <View style={styles.inputContainer}>
            <View style={styles.labelContainer}>
              <Text style={styles.labelText}>Latitud</Text>
            </View>
            <TextInput
              style={styles.input}
              placeholder="Enter location latitude"
              // value={activity.location.latitude.toString()} 
              onChangeText={(value) => setActivity({ ...activity, location: { ...activity.location, latitude: parseFloat(value) } })}
            />
          </View>

          <View style={styles.inputContainer}>
            <View style={styles.labelContainer}>
              <Text style={styles.labelText}>Longitud</Text>
            </View>
            <TextInput
              style={styles.input}
              placeholder="Enter location longitude"
              // value={activity.location.longitude.toString()}
              onChangeText={(value) => setActivity({ ...activity, location: { ...activity.location, longitude: parseFloat(value) } })}
            />
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.blackButton} onPress={openCamera}>
              <Text style={styles.buttonText}>Toma una foto con la cámara</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.blackButton} onPress={openGallery}>
              <Text style={styles.buttonText}>Sube una foto de tu dispositivo</Text>
            </TouchableOpacity>
          </View>

          {localImage && (
                  <View style={{ width: 160, flexDirection:'row', height: 40, backgroundColor:'#fff', borderRadius:4, alignItems:'center', marginBottom:8 }}>
                    <Image
                      source={{ uri: localImage }}
                      style={{ width: '30%', height:'90%', margin:1 }}
                    />
                    <Text style={{fontSize:10, width:'40%', padding:2, margin:6}}>Imagen seleccionada</Text>
                    <TouchableOpacity
                      onPress={() => setLocalImage(null)}
                      style={{ backgroundColor: 'transparent'}}
                    >
                      <Ionicons name="trash" size={24} color="black" />
                    </TouchableOpacity>
                  </View>
                )}

          <TouchableOpacity style={styles.cyanButton} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Create</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    padding: 24,
  },
  inputContainer: {
    marginVertical: 10,
    width: '100%',
    position: 'relative',
  },
  labelContainer: {
    position: 'absolute',
    top: -10,
    left: 10,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 15,
    zIndex: 1,
    borderRadius: 10,
    width: '50%', // Ajusta el ancho de la etiqueta a 60%
    alignItems: 'center', // Centrar el texto dentro del contenedor
  },
  labelText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    height: 50, // Ajusta la altura del cuadro de texto
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    flexWrap: 'wrap',
    textAlign: 'center',
  },
  datePicker: {
    width: '100%',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  blackButton: {
    backgroundColor: '#000000',
    padding: 10,
    borderRadius: 10,
    width: '45%',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 4,
  },
  cyanButton: {
    backgroundColor: '#00CED1',
    padding: 10,
    borderRadius: 10,
    width: '45%',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 4,
    alignSelf: 'center', // Agrega esta línea para centrar el botón
  },
});
