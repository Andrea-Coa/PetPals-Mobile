import React, {  useEffect, useState } from 'react'
import { 
  FlatList, 
  View , 
  Text, 
  ImageBackground, 
  Button, 
  TouchableOpacity, 
  Image,
  StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { fetchActivityInProgress, getRoleBasedOnToken } from '../api';
import {useNavigation} from '@react-navigation/native';


export const ActivityFeedScreen = () => {
  const [activities, setActivities] = useState([]);
  const [page, setPage] = useState(0);
  const role = getRoleBasedOnToken();
  const image = "https://res.cloudinary.com/dp7zuvv8c/image/upload/v1/PetPals/rnhafgpvrssjyk2bufre?_a=DATAdtAAZAA0";


  const navigation = useNavigation();

  useEffect(() => {
    const getActivities = async(page) => {
      try {
        const res = await fetchActivityInProgress(page);
        setActivities(res.content);
      }
      catch(error) {
        console.error('failed to fetch activities', error);
      }
    }
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
                <Text>{item.companyDto.name}</Text>
                <Text>{item.locations && item.locations.length > 0 ? item.locations[0].address : 'No location available'}</Text>
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
})
