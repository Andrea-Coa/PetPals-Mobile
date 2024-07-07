import React, { useEffect, useState } from 'react';
import { 
  FlatList, 
  View, 
  Text, 
  ImageBackground, 
  TouchableOpacity, 
  Image, 
  StyleSheet 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fetchActivityInProgress, getRoleBasedOnToken, fetchActivitiesByType } from '../api';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';

const ActivityFeedScreen = () => {
  const [activities, setActivities] = useState([]);
  const [page, setPage] = useState(0);
  const [role, setRole] = useState(null);
  const [activityType, setActivityType] = useState("all");
  const navigation = useNavigation();
  const isFocused = useIsFocused(); // Hook to check if screen is focused
  const image = "https://res.cloudinary.com/dp7zuvv8c/image/upload/v1/PetPals/rnhafgpvrssjyk2bufre?_a=DATAdtAAZAA0";

  const getActivities = async (page, type) => {
    try {
      if (type === "all") {
        const res = await fetchActivityInProgress(page);
        setActivities(res.content);
      } else {
        const res = await fetchActivitiesByType(page, type);
        setActivities(res.content);
      }
    } catch (error) {
      console.error('failed to fetch activities', error);
    }
  };

  useEffect(() => {
    const fetchRole = async () => {
      const userRole = await getRoleBasedOnToken();
      setRole(userRole);
    };
    fetchRole();
  }, []);

  useEffect(() => {
    if (isFocused) {
      getActivities(page, activityType);
    }
  }, [isFocused, page, activityType]);

  console.log(activities);

  return (
    <ImageBackground source={require("../assets/dog_bg.png")} style={{ flex: 1 }}>
      {role === 'ROLE_COMPANY' && (
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CreateActivity')}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="create" size={24} color="white" />
              <Text style={styles.buttonText}>Crear Actividad</Text>
            </View>
          </TouchableOpacity>
      )}
      <View style={styles.pickerbox}>
        <Picker
          style={{ color: 'white' }}
          selectedValue={activityType}
          onValueChange={(itemValue) => setActivityType(itemValue)}
          accessible={true}
          accessibilityLabel="filtrar por tipo de actividad"
        >
          <Picker.Item label="Todos" value="all" />
          <Picker.Item label="Vaccination Campaign" value="VACCINATION_CAMPAIGN" />
          <Picker.Item label="Adoption Campaign" value="ADOPTION_CAMPAIGN" />
          <Picker.Item label="Limited Discount" value="LIMITED_DISCOUNT" />
          <Picker.Item label="Pet Contest" value="PET_CONTEST" />
          <Picker.Item label="Workshop" value="WORKSHOP" />
          <Picker.Item label="Other" value="OTHER" />
        </Picker>
      </View>
      <SafeAreaView style={styles.listContainer}>    
        <FlatList
          data ={activities}
          keyExtractor={(item)=> item.id.toString()}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => {navigation.navigate('Evento', { id: item.id })}}>
              <View style={styles.itemBox}>
                <Image 
                  source={{ uri: item.image ? item.image : image }} 
                  style={{ width: 100, height: 100, margin: 10 }} 
                />
                <View style={{ margin: 10 }}>
                  <Text style={styles.activityTitle}>{item.name}</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <FontAwesome5 name="house-user" size={16} color="black" style={{ paddingRight: 4 }} />
                    <Text>{item.companyDto.name}</Text>
                  </View>
                  {item.locations[0] && (
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Entypo name="location" size={16} color="black" style={{ paddingRight: 4 }} />
                      <Text> {item.locations[0].address} </Text>
                    </View>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </SafeAreaView>
    </ImageBackground>
  );  
}

const styles = StyleSheet.create({
  itemBox: {
    flexDirection: 'row',
    backgroundColor: 'white',
    margin: 10,
    borderRadius: 5
  },
  activityTitle: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  button: {
    backgroundColor: '#00CED1',
    paddingVertical: 6,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginHorizontal: 24,
    alignItems: 'center',
    marginTop: 10 // Para agregar algo de margen superior si es necesario
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'semibold',
  },
  pickerbox: {
    justifyContent: 'center',
    width: '95%', // Cambia esto según tu diseño
    height: 40,
    padding: 4,
    backgroundColor: '#00CED1',
    borderRadius: 8,
    margin: 10,
    marginBottom: 40, // Agrega margen inferior para separar el picker del botón
    overflow: 'hidden', // Esto asegura que las opciones no seleccionadas sean visibles
  },
  picker: {
    height: 200, // Ajusta la altura para que las opciones sean visibles
    transform: [{ scaleY: 1.2 }] // Ajusta la escala si es necesario para mejor visibilidad
  },
  listContainer: {
    marginTop: -50 // Agrega margen superior para subir el cuadro de la lista de actividades
  }
});

export default ActivityFeedScreen;
