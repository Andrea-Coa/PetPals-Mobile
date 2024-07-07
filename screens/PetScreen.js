import React, { useEffect, useState } from 'react'
import { Text, ImageBackground, StyleSheet, Image, View, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getRoleBasedOnToken, fetchAdopt } from '../api';

export const PetScreen = ({route, navigation}) => {
    const [role, setRole] = useState(null);
    const [adopt, setAdopt] = useState(false);
    const [adoptionDesc, setAdoptionDesc] = useState({description:null});
    const {pet} = route.params;

    useEffect(() => {
        const fetchRole = async () => {
          const userRole = await getRoleBasedOnToken();
          setRole(userRole);
        };
        fetchRole();
      }, []);
    
    const handleCancel = () => {
        setAdopt(!adopt);
    }

    const handleAdopt = async(id, body) => {
        try {
            await fetchAdopt(id, body);
            navigation.reset({
                index: 0,
                routes: [{ name: 'PetFeed' }],
              });
        } catch(error) {
            console.error('failed to adopt', error);
        }
    }
    return (
        
        <ImageBackground source={require("../assets/huella-perro.png")} style={styles.background}>
                        <ScrollView >
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
                
                { role == 'ROLE_PERSON' && !adopt &&
                    <TouchableOpacity 
                        style={styles.button} 
                        onPress={handleCancel}>
                        <Text style={styles.buttonText}>¡Quiero adoptar!</Text>
                    </TouchableOpacity>}

                {role == 'ROLE_PERSON' && adopt && 
                <View style={styles.adoptionBox}>
                    <View style={styles.adoptionInput}>
                        <Text style={styles.prompt}>{`Agrega un mensaje para la compañía de ${pet.name}`}</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={(value)=> setAdoptionDesc({...adoptionDesc, description
                            :value})}
                            multiline
                        />
                    </View>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity 
                            style={styles.cancelButton} 
                            onPress={handleCancel}>
                            <Text style={styles.buttonText}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={styles.button} 
                            onPress={()=>{handleAdopt(pet.id, adoptionDesc)}}>
                            <Text style={styles.buttonText}>Adoptar</Text>
                        </TouchableOpacity>
                    </View>
                </View>}
            </SafeAreaView>
            </ScrollView>

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
        justifyContent:'center'
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
        borderRadius: 10,
        width:'40%',
        alignItems:'center'
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'semibold',
    }, 
    cancelButton: {
        marginTop: 30,
        borderColor: '#00CED1',
        borderWidth: 1,
        backgroundColor: 'transparent',
        paddingVertical: 10,
        width:'40%',
        borderRadius: 10,
        alignItems:'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    prompt: {
        color:'white',
        marginVertical:8,
        padding:8
    },
    adoptionBox: {
        width:'90%',
        padding:12
    },
    input: {
        height: 100,
        width: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        color: 'white',
        padding: 10,
        borderRadius: 5,
    },
})
