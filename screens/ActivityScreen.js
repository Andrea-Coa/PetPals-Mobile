import React, { useEffect, useState } from 'react';
import { fetchSingleActivity } from '../api';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View, Image, ImageBackground, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ActivityMap from './ActivityMap';

const ActivityScreen = (props) => {
  const [activity, setActivity] = useState(null);
  const navigation = useNavigation();
  const defaultImage = "https://res.cloudinary.com/dp7zuvv8c/image/upload/v1/PetPals/nbgzcrq0gafkkiafmkeq?_a=DATAdtAAZAA0";

  useEffect(() => {
    const getActivity = async () => {
      try {
        const res = await fetchSingleActivity(props.route.params.id);
        console.log("IIIII", res);
        setActivity(res);
      } catch (error) {
        console.error('Error fetching activity', error);
      }
    };
    getActivity();
  }, [props.route.params.id]);

  return (
    <ImageBackground source={require("../assets/huella-perro.png")} style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
      <SafeAreaView style={{flex: 1, alignItems: 'center'}}>
        {activity && 
          <ScrollView contentContainerStyle={styles.whitebox}>
            <Image 
              source={{uri: activity.image ? activity.image : defaultImage}}
              style={{width:300, height:300}}
              resizeMode='cover'
            />
            <View style={{width:'100%'}}>
              <Text style={styles.title}>{activity.name}</Text>
              <Text style={{ color: '#FF7F50' }}>{activity.activityType}</Text>
              <TouchableOpacity onPress={()=> navigation.navigate('PublicCompanyProfile', {id:activity.companyDto.id})}>
                <Text style={{marginBottom: 20}}>By {activity.companyDto.name}</Text>
              </TouchableOpacity>

              <Text>Inicio: {activity.startDate}</Text>
              <Text>Fin: {activity.endDate}</Text>
              <Text style={{fontWeight:'bold', marginTop:20}}>Ubicación: </Text>
              <Text>{activity.locations && activity.locations.length > 0 ? activity.locations[0].address : 'No location available'}</Text>
            </View>
            {activity.locations && activity.locations[0] && <ActivityMap coordinates={activity.locations[0]}/>}
            
          </ScrollView>}
          {/* <Button title='MAP' onPress={()=>{navigation.navigate('Mapa')}}></Button> */}
      </SafeAreaView>
    </ImageBackground>
    );
};

const styles = StyleSheet.create({
  whitebox: {
    backgroundColor: 'white', 
    padding: 20, 
    borderRadius: 10, 
    alignItems: 'flex-start' 
  },
  title: {
    marginTop:10,
    fontSize: 40,
    fontWeight: 'bold'
  }});

export default ActivityScreen;
