import React, { startTransition, useEffect, useState } from 'react';
import { fetchPublicCompanyProfile, getRoleBasedOnToken, fetchIsSubscribed, fetchSubscribe, fetchUnsubscribe } from '../api';
import { Button, ImageBackground, Text, View, Image, StyleSheet, TouchableOpacity, FlatList, TouchableHighlight } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

export const PublicCompanyProfileScreen = ({route, navigation}) => {
    const foregroundUri = "https://res.cloudinary.com/dp7zuvv8c/image/upload/v1/nagmdobzj6ekxuqjokp2?_a=DATAdtAAZAA0";
    const [displayedUserId, setDisplayedUserId] = useState(null);
    const [userData, setUserData] = useState({});
    const [role, setRole] = useState(null);
    const [showSubscribe, setShowSubscribe] = useState(true);

    useEffect(()=> {
        const setId = () => {
            const {id} = route.params;
            setDisplayedUserId(id);
        }
        const fetchRole = async () => {
            const userRole = await getRoleBasedOnToken();
            setRole(userRole);
         };
        setId();
        fetchRole();
    },[]);

    useEffect(()=> {
        const getPublicCompanyProfile = async() => {
            try {
                const res = await fetchPublicCompanyProfile(displayedUserId);
                console.log('this is respo', res);
                setUserData(res);
                const show = await fetchIsSubscribed(displayedUserId);
                setShowSubscribe(!show);
            } catch(error) {
                console.error('failed to get public profile of', displayedUserId);
            }
        }
        if (displayedUserId) {
            getPublicCompanyProfile(displayedUserId);
        }
    },[displayedUserId]);

    const handleSubscribe = async() => {
        try {
            await fetchSubscribe(userData.id);
            setShowSubscribe(false);
        } catch(error) {
            console.error('failed to subscribe to', userData.id);
        }
    }
    const handleUnsubscribe = async() => {
        try {
            await fetchUnsubscribe(userData.id);
            setShowSubscribe(true);
        } catch(error) {
            console.error('failed to UNsubscribe to', userData.id);
        }
    }

    return (
        <ImageBackground source={require("../assets/dog_bg.png")} style={styles.background}>
                <ImageBackground source={ { uri: userData.bannerImage ? userData.bannerImage : foregroundUri }} style={styles.banner}>
                    <View style={styles.circle}>
                        <Image source={ userData.profileImage ? {uri:userData.profileImage} :require('../assets/user-profile.jpg') } style={styles.picture} />
                    </View>
                </ImageBackground>
            

            <SafeAreaView >
            <View style={styles.mainInfo}>
                <Text style={styles.username}>{userData.name}</Text>
                {role== 'ROLE_PERSON' && 
                (showSubscribe ? 
                <TouchableOpacity 
                    style={ styles.button }
                    onPress={handleSubscribe}>
                    <Ionicons name="notifications" size={16} color="white" />
                    <Text style={styles.buttonText}> Suscribirse</Text>
                </TouchableOpacity>
                :
                <TouchableOpacity 
                    style={ styles.buttonCancel}
                    onPress={handleUnsubscribe}>
                    <Ionicons name="notifications-off" size={16} color="white" />
                    <Text style={styles.buttonText}> Cancelar suscripción</Text>
                </TouchableOpacity>)}
            </View>
            <View style={styles.sucursales}>
            {userData.locations && userData.locations[0] &&
            <View style={{ height: '70%' , alignItems:'center'}}>
                <Text style={styles.buttonText}>Encuéntranos en</Text>
            <FlatList
            data={userData.locations}
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
            </FlatList>
            </View>}
            </View>
            </SafeAreaView>

        </ImageBackground>


    )
}

const styles = StyleSheet.create({
    background: {
      flex: 1,
      justifyContent:'center',
      alignItems:'center'
    },
    banner: {
      width: '100%',
      height: 200,
    },
    circle: {
      width: 136,
      height: 136,
      borderRadius: 68,
      position: 'absolute',
      bottom: -68,
      alignSelf: 'center',
      borderColor: '#5B2076',
      borderWidth: 4,
      overflow: 'hidden',
    },
    picture: {
      width: 128,
      height: 128,
      borderRadius: 64,
    },
    mainInfo: {
      alignItems: 'center',
      marginTop: 32,
    },
    username: {
      fontSize: 30,
      fontWeight: 'semibold',
      color: '#fff',
    },
    email: {
      color: '#fff',
    },
    secondaryInfo: {
      width: '100%',
      padding: 64,
      flexDirection: 'column',
    },
    secondaryItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
    },
    button:{
        backgroundColor:'#00CED1',
        paddingHorizontal:12,
        paddingVertical:4,
        margin:12,
        borderRadius:4,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
    },
    buttonText :{
        color:'white',
        paddingHorizontal:4,
        paddingBottom:2
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
    buttonCancel: {
        borderWidth:1,
        borderColor:'#00CED1',
        paddingHorizontal:12,
        paddingVertical:4,
        margin:12,
        borderRadius:4,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
    }

  });