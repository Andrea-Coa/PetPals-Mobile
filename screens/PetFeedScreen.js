import React, { useEffect, useState } from 'react'
import { fetchPetsDefault, fetchPetsSpecies, getRoleBasedOnToken } from '../api';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ImageBackground, Text, StyleSheet, FlatList, View, TouchableOpacity } from 'react-native';
import { PetCard } from '../components/PetCard';
import {useNavigation} from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';


export const PetFeedScreen = () => {
    const [pets, setPets] = useState([]);
    const [species, setSpecies] = useState("todos");
    const [page, setPage] = useState(0);
    const [role, setRole] = useState(null);
    const [totalPages, setTotalPages] = useState(0);
    const navigation = useNavigation();

    useEffect(()=> {
      const getPetsDefault = async() => {
          if (species != "todos") {
            try {
              const res = await fetchPetsSpecies(page, species);
              setPets(res.content);
            } catch (error ) {
              console.error('FAILED TO FETCH BY SPECIES', error);
            }
          }
          else {
            try {
              const res = await fetchPetsDefault(page);
              console.log("dshfajd", res);
              setPets(res.content);
          } catch(error) {
              console.error('FAILED TO FETCH PETS');
            }
          } 
          
      };
      const fetchRole = async () => {
        const roleFromToken = await getRoleBasedOnToken();
        setRole(roleFromToken);
      };
      fetchRole();
      getPetsDefault();
  }, [species]);

  console.log('SPECIES', species);

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

          <View style={styles.pickerbox}>
            <Picker 
              style={{ color:'white' }}
              selectedValue={species}
              onValueChange={(itemValue) => setSpecies(itemValue)}
              accessible={true}
              accessibilityLabel="buscar por especie"
            >
              <Picker.Item label="Todos" value="todos" />
              <Picker.Item label="Perro" value="DOG" />
              <Picker.Item label="Gato" value="CAT" />
              <Picker.Item label="Roedor" value="RODENT" />
              <Picker.Item label="Ave" value="BIRD" />
              <Picker.Item label="Otro" value="OTHER" />

            </Picker>
          </View>

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
      alignItems:'center',
      marginTop: -30 // Para agregar algo de margen superior si es necesario
  },
  buttonText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: 'semibold',
      paddingHorizontal:8
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
  }
  });