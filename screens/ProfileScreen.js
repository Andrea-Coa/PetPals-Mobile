import React, { startTransition, useEffect, useState } from 'react';
import { fetchUserProfile, getRoleBasedOnToken } from '../api';
import { Button, ImageBackground, Text, View, Image, StyleSheet, TouchableOpacity, ScrollView, TouchableHighlight } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as SecureStore from 'expo-secure-store'
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

const foregroundUri = "https://res.cloudinary.com/dp7zuvv8c/image/upload/v1/nagmdobzj6ekxuqjokp2?_a=DATAdtAAZAA0";
const ProfilePicUri = "https://res.cloudinary.com/dp7zuvv8c/image/upload/v1/PetPals/rnhafgpvrssjyk2bufre?_a=DATAdtAAZAA0";

export const ProfileScreen = () => {
  const [userData, setUserData] = useState({});
  const [role, setRole] = useState(null);
  const navigation = useNavigation();

  const logout = async () => {
    await SecureStore.deleteItemAsync('token');
    navigation.reset({
      index: 0,
      routes: [{ name: 'Home' }],
    });
  };
console.log(userData);
  useEffect(() => {
    const getProfile = async () => {
      try {
        const res = await fetchUserProfile();
        setUserData(res || {}); // Asegura que userData siempre sea un objeto
      } catch (error) {
        console.error('profileScreen:', error);
      }
    };
    const getRole = async() => {
      const r = await getRoleBasedOnToken();
      setRole(r);
    }
    getProfile();
    getRole();
  }, []);

  return (
    <ImageBackground source={require("../assets/dog_bg.png")} style={styles.background}>
      <ScrollView>
      <ImageBackground source={ { uri: userData.bannerImage ? userData.bannerImage : foregroundUri }} style={styles.banner}>
        <View style={styles.circle}>
        <TouchableHighlight onPress={() => navigation.navigate('ChangeProfilePhoto', { currentPhoto: userData.profileImage })}>          
        <Image source={ userData.profileImage ? {uri:userData.profileImage} :require('../assets/user-profile.jpg') } style={styles.picture} />
          </TouchableHighlight>
        </View>
      </ImageBackground>
      
      <SafeAreaView style>
        <View style={styles.mainInfo}>
          <Text style={styles.username}>{userData.name}</Text>
          <Text style={styles.email}>{userData.email}</Text>
        </View>

        <View style={styles.secondaryInfo}>
          <View style={styles.secondaryItem}>
            <Text style={{ color: '#fff' }}>Te uniste en </Text>
            {userData.created && <Text style={{ color: '#fff' }}>{userData.created.substring(0, 10)}</Text>}
          </View>
          {userData.ruc &&
            <View style={styles.secondaryItem}>
              <Text style={{ color: '#fff' }}>RUC</Text>
              <Text style={{ color: '#fff' }}>{userData.ruc}</Text>
            </View>
          }
        </View>

        <View style={styles.buttonColumn}>
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.edit}
              onPress={() => navigation.navigate('EditProfile')}
              >
              <Ionicons name="pencil" size={16} color="white" />
              <Text style={styles.editText}>Editar cuenta</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.logout}
              onPress={logout}>
              <Text style={styles.logoutText}>Cerrar sesión</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.buttonColumn}>

            {role == 'ROLE_COMPANY' && 
            <TouchableOpacity 
              onPress={() => navigation.navigate('SucursalesFeedScreen', { locations: userData.locations })}              
              style={styles.whitebox}>
              <View style={styles.cyanbox}>
                <Entypo name="location" size={32} color="#00CED1" />
              </View>
              <View style={styles.textContainer}>
                <Text style={{ fontWeight:'bold' }}>Mis sucursales</Text>
                <Text style={{ flexWrap:'wrap' }}>Todas las ubicaciones de la empresa.</Text>
              </View>
            </TouchableOpacity>
            }


            {role == 'ROLE_COMPANY' && 
            <TouchableOpacity 
              onPress={() => navigation.navigate('SubscriptorsFeedScreen')}
              style={styles.whitebox}>
                <View style={styles.cyanbox}>
                <FontAwesome name="user" size={32} color="#00CED1" />
              </View>
              <View style={styles.textContainer}>
                <Text style={{ fontWeight:'bold' }}>Mis suscriptores</Text>
                <Text style={{ flexWrap:'wrap' }}>Las personas que se han suscrito a tu cuenta.</Text>
              </View>
            </TouchableOpacity>
            }

            {role == 'ROLE_COMPANY' && 
            <TouchableOpacity 
            onPress={() => navigation.navigate('MyPetsCompanyScreen', { id: userData.id })}              
            style={styles.whitebox}>
              <View style={styles.cyanbox}>
                <Ionicons name="paw" size={32} color="#00CED1" />
              </View>
              <View style={styles.textContainer}>
                <Text style={{ fontWeight:'bold' }}>Mis mascotas</Text>
                <Text style={{ flexWrap:'wrap' }}>Las mascotas que has dado en adopción a través de Pet Pals.</Text>
              </View>
            </TouchableOpacity>
            }

            {role == 'ROLE_PERSON' &&
            <TouchableOpacity 
              onPress={() => navigation.navigate('MyPetsFeedScreen')}
              style={styles.whitebox}>
              <View style={styles.cyanbox}>
                <Ionicons name="paw" size={32} color="#00CED1" />
              </View>
              <View style={styles.textContainer}>
              <Text style={{ fontWeight:'bold' }}>Mis mascotas</Text>
              <Text style={{ flexWrap:'wrap' }}>Mira todas las mascotas que has adoptado.</Text>
              </View>
            </TouchableOpacity>
            }

            {role == 'ROLE_PERSON' &&
            <TouchableOpacity 
              onPress={() => navigation.navigate('MySubscriptionsFeedScreen')} // navigate to my subsctiptions!!! 
              style={styles.whitebox}>
              <View style={styles.cyanbox}>
                <FontAwesome name="users" size={32} color="#00CED1" />
              </View>
              <View style={styles.textContainer}>
              <Text style={{ fontWeight:'bold' }}>Mis suscripciones</Text>
              <Text style={{ flexWrap:'wrap' }}>Cuentas a las que te has suscrito.</Text>
              </View>
            </TouchableOpacity>
            }
          </View>

          <TouchableOpacity style={styles.deleteAccount}>
              <Text style={styles.deleteAccountText}>Eliminar cuenta</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: 'center',
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
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 40,
    marginTop: 20,
    width: '90%',
    paddingHorizontal:10
  },
  buttonColumn: {
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
  },
  edit: {
    backgroundColor:'#00CED1',
    borderRadius:4,
    paddingHorizontal:12,
    paddingVertical:8,
    flexDirection:'row'
  },
  editText: {
    color:'white',
    paddingHorizontal:8
  },
  logout: {
    borderRadius:4,
    paddingHorizontal:12,
    paddingVertical:8,
    flexDirection:'row'
  },
  logoutText: {
    color:'white',
    fontWeight:'bold',
    textDecorationLine: 'underline'
  },
  deleteAccount:{
    margin:40
  },
  deleteAccountText: {
    color:'red',
    fontWeight:'bold',
    textDecorationLine: 'underline'
  },
  whitebox: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 24,
    marginBottom:12,
    flexDirection:'row'
  },
  cyanbox: { 
    backgroundColor:'rgba(0, 206, 209, 0.3)', 
    width:50, 
    height:50, 
    alignItems:'center', 
    justifyContent:'center'},
  textContainer: {
    justifyContent: 'center',
    paddingHorizontal:8,
    flex:1
  },
  
});
