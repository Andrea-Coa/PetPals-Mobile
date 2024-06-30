import React, { act, useEffect, useState } from 'react'
import { FlatList, View , Text, ImageBackground, TouchableHighlight, Button} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { fetchActivityInProgress, getRoleBasedOnToken } from '../api';
import {useNavigation} from '@react-navigation/native';


export const ActivityFeedScreen = () => {
  const [activities, setActivities] = useState([]);
  const [page, setPage] = useState(0);
  const role = getRoleBasedOnToken();

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
          <TouchableHighlight onPress={() => {console.log("jolaaa", item.id); navigation.navigate('Evento', { id: item.id })}}>
            <View>
              <Text> {item.name}</Text>
              <Text>{item.activityType}</Text>
              <Text>{item.companyDto.name}</Text>
              <Text>{item.startDate}</Text>
              <Text>{item.endDate}</Text>
              <Text>{item.locations && item.locations.length > 0 ? item.locations[0].address : 'No location available'}</Text>
            </View>
          </TouchableHighlight>
        )}

      />
    </SafeAreaView>
    </ImageBackground>

  )
}
