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
import { fetchActivityInProgress, getRoleBasedOnToken } from '../api';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

const ActivityFeedScreen = () => {
  const [activities, setActivities] = useState([]);
  const [page, setPage] = useState(0);
  const [role, setRole] = useState(null);
  const navigation = useNavigation();
  const isFocused = useIsFocused(); // Hook to check if screen is focused
  const image = "https://res.cloudinary.com/dp7zuvv8c/image/upload/v1/PetPals/rnhafgpvrssjyk2bufre?_a=DATAdtAAZAA0";

  const getActivities = async (page) => {
    try {
      const res = await fetchActivityInProgress(page);
      setActivities(res.content);
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
      getActivities(page);
    }
  }, [isFocused, page]);

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
      <SafeAreaView>    
        <FlatList
          data ={activities}
          keyExtractor={(item)=> item.id.toString()}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => {navigation.navigate('Evento', { id: item.id })}}>
              <View style={styles.itemBox}>
                <Image 
                  source={{ uri: image }} 
                  style={{ width: 100, height: 100, margin: 10 }} 
                />
                <View style={{ margin: 10 }}>
                  <Text style={styles.activityTitle}>{item.name}</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <FontAwesome5 name="house-user" size={16} color="black" style={{paddingRight:4}} />
                    <Text>{item.companyDto.name}</Text>
                  </View >
                  {item.locations[0] && (
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Entypo name="location" size={16} color="black" style={{paddingRight:4}} />
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
  itemBox : { 
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
  }
});

export default ActivityFeedScreen;
