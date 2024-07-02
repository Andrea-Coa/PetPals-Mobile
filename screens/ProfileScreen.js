import React, { useEffect, useState } from 'react';
import { fetchUserProfile } from '../api';
import { Button, ImageBackground, Text, View, Image, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const foregroundUri = "https://res.cloudinary.com/dp7zuvv8c/image/upload/v1/PetPals/nbgzcrq0gafkkiafmkeq?_a=DATAdtAAZAA0";
const ProfilePicUri = "https://res.cloudinary.com/dp7zuvv8c/image/upload/v1/PetPals/rnhafgpvrssjyk2bufre?_a=DATAdtAAZAA0";

export const ProfileScreen = () => {
  const [userData, setUserData] = useState({});
  const navigation = useNavigation();

  const logout = async () => {
    await AsyncStorage.removeItem('token');
    navigation.navigate('Home');
  };

  useEffect(() => {
    const getProfile = async () => {
      try {
        const res = await fetchUserProfile();
        setUserData(res || {}); // Asegura que userData siempre sea un objeto
      } catch (error) {
        console.error('profileScreen:', error);
      }
    };
    getProfile();
  }, []);

  return (
    <ImageBackground source={require("../assets/dog_bg.png")} style={styles.background}>
      <ImageBackground source={{ uri: foregroundUri }} style={styles.banner}>
        <View style={styles.circle}>
          <Image source={{ uri: ProfilePicUri }} style={styles.picture} />
        </View>
      </ImageBackground>
      <SafeAreaView>
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

        <Button title='Editar cuenta' onPress={() => navigation.navigate('EditProfile')}></Button>
        <Button title='Cerrar sesión' onPress={logout}></Button>
        <Button title='Eliminar cuenta'></Button>
      </SafeAreaView>
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
});
