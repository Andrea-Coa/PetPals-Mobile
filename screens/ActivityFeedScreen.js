import React, { useEffect, useState } from 'react';
import { 
  FlatList, 
  View, 
  Text, 
  ImageBackground, 
  Button, 
  TouchableOpacity, 
  Image, 
  StyleSheet 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fetchActivityInProgress, getRoleBasedOnToken } from '../api';
import { useNavigation } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

const ActivityFeedScreen = () => {
  const [activities, setActivities] = useState([]);
  const [page, setPage] = useState(0);
  const [role, setRole] = useState(null);
  const navigation = useNavigation();
  const image = "https://res.cloudinary.com/dp7zuvv8c/image/upload/v1/PetPals/rnhafgpvrssjyk2bufre?_a=DATAdtAAZAA0";

  useEffect(() => {
    const fetchRole = async () => {
      const userRole = await getRoleBasedOnToken();
      setRole(userRole);
    };
    fetchRole();

    const getActivities = async (page) => {
      try {
        const res = await fetchActivityInProgress(page);
        setActivities(res.content);
      } catch (error) {
        console.error('failed to fetch activities', error);
      }
    };
    getActivities(page);
  }, [page]);

  console.log(activities);

  return (
    <ImageBackground source={require("../assets/dog_bg.png")} style={{ flex: 1 }}>
      {role === 'ROLE_COMPANY' && (
      <Button 
        title="Crear Actividad"
        accessibilityLabel="Botón para crear nueva actividad"
      />
    )}
    <SafeAreaView>    
      <FlatList
        data ={activities}
        keyExtractor={(item)=> item.id.toString()}
        // ListHeaderComponent={<Text>Eventos disponibles</Text>}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => {navigation.navigate('Evento', { id: item.id })}}>
            <View style={styles.itemBox}>
              <Image 
                source={{ uri: image }} 
                style={{ width: 100, height: 100, margin: 10 }} 
              />
              <View  style={{ margin: 10 }}>
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
  }
});

export default ActivityFeedScreen;
