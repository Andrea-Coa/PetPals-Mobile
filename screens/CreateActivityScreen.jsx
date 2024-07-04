import React, { useState, useEffect } from 'react';
import { ImageBackground, View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker'; // Asegúrate de tener instalado y correctamente importado el Picker
import { fetchCreateActivity } from '../api';
import { useNavigation, useRoute } from '@react-navigation/native';

const bgImage = require('../assets/huella-perro.png');

export default function CreateActivityScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const [activity, setActivity] = useState({
    name: '',
    startDate: new Date(),
    endDate: new Date(),
    activityType: '',
    location: {
      address: '',
      latitude: 40.785091, // Default positive latitude
      longitude: -73.968285, // Default positive longitude
    },
    image: 'https://res.cloudinary.com/dp7zuvv8c/image/upload/v1719925435/PetPals/borzqbceaaxxzkjqfgyu?_a=DATAdtAAZAA0',
  });

  useEffect(() => {
    if (route.params?.photoUri) {
      setActivity({ ...activity, image: route.params.photoUri });
    }
  }, [route.params?.photoUri]);

  const handleSubmit = async () => {
    if (!activity.name || !activity.startDate || !activity.endDate || !activity.activityType || !activity.location.address || !activity.image) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const newActivity = {
      ...activity,
      startDate: activity.startDate.toISOString().split('T')[0],
      endDate: activity.endDate.toISOString().split('T')[0],
    };

    console.log("JSON enviado:", JSON.stringify(newActivity, null, 2));

    try {
      await fetchCreateActivity(newActivity);
      Alert.alert('Success', 'Activity created successfully');
      navigation.navigate('Eventos', { reload: true });
    } catch (error) {
      Alert.alert('Error', `There was a problem creating the activity: ${error.message}`);
    }
  };

  const navigateCamera = () => {
    navigation.navigate('Camera', { returnScreen: 'CreateActivity' });
  };

  const navigateGallery = () => {
    navigation.navigate('Gallery', { returnScreen: 'CreateActivity' });
  };

  return (
    <ImageBackground source={bgImage} style={styles.background}>
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <Text style={styles.field}>Nombre</Text>
          <TextInput
            style={styles.box}
            placeholder="Enter activity name"
            value={activity.name}
            onChangeText={(value) => setActivity({ ...activity, name: value })}
          />

          <Text style={styles.field}>Fecha de inicio</Text>
          <DateTimePicker
            value={activity.startDate}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => setActivity({ ...activity, startDate: selectedDate || activity.startDate })}
            style={styles.datePicker}
          />

          <Text style={styles.field}>Fecha de fin</Text>
          <DateTimePicker
            value={activity.endDate}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => setActivity({ ...activity, endDate: selectedDate || activity.endDate })}
            style={styles.datePicker}
          />

          <Text style={styles.field}>Tipo de actividad</Text>
          <View style={[styles.box, { justifyContent: 'center' }]}>
            <Picker
              selectedValue={activity.activityType}
              style={{ height: 180, marginTop: -20 }}  // Ajusta el marginTop para mover los ítems hacia arriba
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

          <Text style={styles.field}>Ubicación</Text>
          <TextInput
            style={styles.box}
            placeholder="Enter location address"
            value={activity.location.address}
            onChangeText={(value) => setActivity({ ...activity, location: { ...activity.location, address: value } })}
          />
          <TextInput
            style={styles.box}
            placeholder="Enter location latitude"
            value={activity.location.latitude.toString()}
            onChangeText={(value) => setActivity({ ...activity, location: { ...activity.location, latitude: parseFloat(value) } })}
          />
          <TextInput
            style={styles.box}
            placeholder="Enter location longitude"
            value={activity.location.longitude.toString()}
            onChangeText={(value) => setActivity({ ...activity, location: { ...activity.location, longitude: parseFloat(value) } })}
          />

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.blackButton} onPress={navigateCamera}>
              <Text style={styles.buttonText}>Toma una foto con la cámara</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.blackButton} onPress={navigateGallery}>
              <Text style={styles.buttonText}>Sube una foto de tu dispositivo</Text>
            </TouchableOpacity>
          </View>

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
  field: {
    color: 'white',
    marginBottom: 4,
    marginLeft: 8,
  },
  box: {
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
  },
});
