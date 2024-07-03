import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View, Dimensions, Image } from 'react-native';
import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';

const windowWidth = Dimensions.get('window').width;
const petLocationIcon = require("../assets/pet-location.png");

const ActivityMap = ({ coordinates }) => {
  // algo causa un error a veces
  const [userLocation, setUserLocation] = useState({latitude:0, longitude:0});
  const activityLocation = { latitude: coordinates.latitude, longitude: coordinates.longitude };

  const getPermissions = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      alert('Cannot display your location');
      return;
    }
    let loc = await Location.getCurrentPositionAsync({});
    const current = {
      latitude: loc.coords.latitude,
      longitude: loc.coords.longitude,
    };
    setUserLocation(current);
  };
  console.log(userLocation);

  useEffect(() => {
    getPermissions();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: activityLocation.latitude,
          longitude: activityLocation.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker
          coordinate={activityLocation}
          title="Title"
          description="Description"
        >
          <Image
            source={petLocationIcon}
            style={{ height: 40, width: 40 }}
          />
        </Marker>
        <Marker
          coordinate={userLocation}
          title="ME"
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
      flex:1,
      backgroundColor:'#fff',
      alignItems:'center',
      justifyContent:'center',
      marginTop:20
  },
  map :{
      width:windowWidth-90,
      height:400
  }
});

export default ActivityMap;
