import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, ImageBackground, FlatList, Image, TouchableOpacity } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

const SucursalesFeedScreen = ({navigation}) => {
  const route = useRoute();
  const { locations } = route.params;


  return (
    <ImageBackground source={require("../assets/huella-perro.png")} style={{flex:1}}>
      <View style={styles.container}>
        <View style={styles.titlebox}>
          <Text style={styles.title}>Mis sucursales</Text>
        </View>

        <TouchableOpacity 
          style= {styles.button}
          onPress={()=> navigation.navigate('AddCompanyLocation')}>
          <MaterialIcons name="edit-location-alt" size={24} color="white" />
          <Text style={ styles.buttonText }>Agregar una ubicación</Text>
        </TouchableOpacity>

        {locations[0] &&
        <FlatList
          data={locations}
          keyExtractor={(item)=> item.id.toString()}
          renderItem={({item})=> (
            <View style={styles.locationContainer}>
            <FontAwesome5 name="map-marked-alt" size={24} color="#00CED1" />
            <View style={styles.locationTextContainer}>
              <Text style={styles.address}>{item.address}</Text>
              <Text style={styles.coordinates}>{item.latitude}</Text>
              <Text style={styles.coordinates}>{item.longitude}</Text>
            </View>
          </View>
          )}>
        </FlatList>}
      </View>
    </ImageBackground>
)
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  locationContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 10,
    marginVertical: 8,
    marginHorizontal:24,
    alignItems: 'center',
    borderRadius:4,
    alignSelf:'stretch'
  },
  locationTextContainer: {
    marginLeft: 10,
  },
  address: {
    color: 'black',
    flexWrap: 'wrap',
  },
  coordinates: {
    color: 'gray',
  },
  titlebox: {
    padding:8
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color:'white',
    
  },
  button: {
    backgroundColor:'#00CED1',
    paddingHorizontal:12,
    paddingVertical:4,
    marginHorizontal:12,
    borderRadius:4,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center'
  },
  buttonText :{
    color:'white',
    paddingHorizontal:4,
    paddingBottom:2
  }
});

export default SucursalesFeedScreen;
