import React, { useEffect, useState } from 'react'
import { fetchPetsDefault, getRoleBasedOnToken } from '../api';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ImageBackground, Text, StyleSheet, FlatList, View, TouchableOpacity } from 'react-native';
import { PetCard } from '../components/PetCard';
import {useNavigation} from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';

export const PetFeedScreen = () => {
    const [pets, setPets] = useState([]);
    const [page, setPage] = useState(0);
    const [role, setRole] = useState(null);
    const navigation = useNavigation();

    useEffect(()=> {
        const getPetsDefault = async() => {
            try {
                const res = await fetchPetsDefault(page);
                console.log("dshfajd", res);
                setPets(res.content);
            } catch(error) {
                console.error('FAILED TO FETCH PETS');
            }
        };
        const fetchRole = async () => {
          const roleFromToken = await getRoleBasedOnToken();
          setRole(roleFromToken);
        };
        fetchRole();
        getPetsDefault();
    }, []);
    console.log("from feed:",role);
    return (
        <ImageBackground source={require("../assets/huella-perro.png")} style={{flex:1}}>
          <SafeAreaView style={styles.container}>
          {role === 'ROLE_COMPANY' && (
              <TouchableOpacity style={styles.button} onPress={()=>{navigation.navigate('CreatePet')}}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                <FontAwesome5 name="dog" size={24} color="white" />
                <Text style={styles.buttonText}>Agregar mascota</Text>
                </View>

              </TouchableOpacity>
          )}
          <FlatList
            data={pets.length % 2 === 0 ? pets : [...pets, { id: 'empty', empty: true }]}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            renderItem={({ item }) => {
              if (item.empty) {
                // si hay pets impares, se agrega una cajita vacía para que no se vea feo
                return <View style={[styles.card, styles.emptyItem]} />;
              }
              return (
                <TouchableOpacity 
                  onPress={()=>{navigation.navigate('Pet', {pet:item})}}
                  style={styles.card}>                
                    <PetCard pet={item}/>
                </TouchableOpacity>

              );
            }}
          />
          </SafeAreaView>
        </ImageBackground>
      );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    card: {
        flex:1,
        margin: 4,
    },
    button: {
      backgroundColor: '#00CED1',
      paddingVertical: 6,
      paddingHorizontal: 24,
      borderRadius: 8,
      marginHorizontal: 24,
      alignItems:'center'
  },
  buttonText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: 'semibold',
      paddingHorizontal:8
  }

  });