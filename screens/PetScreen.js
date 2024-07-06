import React, { useEffect, useState } from 'react'
import { Text, ImageBackground, StyleSheet, Image, View, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getRoleBasedOnToken } from '../api';

export const PetScreen = ({route}) => {
    const [role, setRole] = useState(null);
    const {pet} = route.params;

    useEffect(() => {
        const fetchRole = async () => {
          const userRole = await getRoleBasedOnToken();
          setRole(userRole);
        };
        fetchRole();
      }, []);

    return (
        
        <ImageBackground source={require("../assets/huella-perro.png")} style={styles.background}>
            <SafeAreaView style={styles.container}>
            {pet.image ? (
                <Image 
                    source={{uri: pet.image}}
                    style={styles.image}
                />
                ) : null}


                <View style={styles.whitebox}>
                    <Text style={styles.name}>{pet.name}</Text>
                    <Text style={styles.breed}>{pet.breed}</Text>
                    <Text style={styles.secondaryInfo}>{pet.description}</Text>
                </View>
                
                { role == 'ROLE_PERSON' &&
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>¡Quiero adoptar!</Text>
                    </TouchableOpacity>}
            </SafeAreaView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center'
    },
    background: {
        flex:1,
        resizeMode:'cover',
        // justifyContent:'center'
    },
    image:{
        width:'84%',
        height:350,
        marginBottom:20,
        borderRadius:8
    },
    whitebox:{
        backgroundColor:'#fff',
        padding:12,
        width:'90%',
        borderRadius:8
    },
    name:{
        fontSize:40,
        fontWeight:'bold'
    },
    breed:{
        color:'#FF7F50',
    },
    secondaryInfo:{
        color:'#808080'
    },
    button: {
        marginTop: 30,
        backgroundColor: '#00CED1',
        paddingVertical: 10,
        paddingHorizontal: 110,
        borderRadius: 10
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'semibold',
    }
})
