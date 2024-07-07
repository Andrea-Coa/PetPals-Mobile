import React, { useEffect, useState } from 'react'
import { fetchAddLocation, fetchPetsDefault, fetchPetsSpecies, getRoleBasedOnToken } from '../api';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ImageBackground, Text, StyleSheet, TextInput, View, TouchableOpacity, ScrollView } from 'react-native';

export const AddCompanyLocationScreen = ({navigation}) => {
    const [location, setLocation] = useState({
        latitude:null,
        longitude:null,
        address:null
    });
    
    const handleSubmit = async() => {
        try {
            await fetchAddLocation(location);
            console.log(location);
            navigation.reset({
                index: 0,
                routes: [{ name: 'Profile' }],
              });
        } catch(error) {
            console.error('couldnt add location', error);
        }
    }
    return (
        <ImageBackground source= {require('../assets/dog_bg.png')} style={{flex:1}}>
            <ScrollView>
                <SafeAreaView>
                <View style={{padding:20}}>
                    <Text style= {styles.title}>Agregar sucursal</Text>
                    <Text style= {styles.subtitle}>Ingresa tus coordenadas para que otros puedan verte en el mapa.</Text>
                </View>
                <View style={styles.container}>
                    <Text style={styles.field}>Dirección</Text>
                    <TextInput
                        label='address'
                        style={styles.box}
                        onChangeText={(value) => setLocation({ ...location, address: value })}
                        accessible={true}
                        accessibilityLabel="ingresa la dirección" />

                    <Text style={styles.field}>Latitud</Text>
                    <TextInput
                        label='latitude'
                        style={styles.box}
                        onChangeText={(value) => setLocation({ ...location, latitude: value })}
                        accessible={true}
                        accessibilityLabel="ingresa la latitud" />
                    
                    <Text style={styles.field}>Longitud</Text>
                    <TextInput
                        label='logitude'
                        style={styles.box}
                        onChangeText={(value) => setLocation({ ...location, longitude: value })}
                        accessible={true}
                        accessibilityLabel="ingresa la longitud" />
                </View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleSubmit}>
                    <Text style={{ color:'white', padding:4}}>
                        Agregar ubicación
                    </Text>
                </TouchableOpacity>
                </SafeAreaView>
            </ScrollView>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    field: {
        color: 'white',
        marginBottom: 4,
        marginLeft: 8
    },
    box: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: 10,
        padding: 10,
        marginBottom: 10
    },
    container:{
        padding:12
    },
    title: {
        color:'white',
        fontSize:32
    },
    subtitle: {
        color:'white',
    },
    button:{
        backgroundColor:'#00CED1',
        paddingHorizontal:12,
        paddingVertical:4,
        marginHorizontal:24,
        borderRadius:4,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
    }
})
