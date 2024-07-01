import axios from 'axios';
import jwtDecode from 'jwt-decode';
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://192.168.1.38:8080'; //Cambiar por tu ip

export const getRoleBasedOnToken = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (token !== null) {
      const decodedToken = jwtDecode(token);
      console.log(decodedToken.role);
      return decodedToken.role;
    } else {
      console.error('Token no encontrado en AsyncStorage');
      return null;
    }
  } catch (error) {
    console.error('Error al obtener el token de AsyncStorage', error);
    return null;
  }
};

export async function fetchRegister(name, email, password, isCompany, ruc) {
  const response = await axios.post(`${API_URL}/auth/register`, { name, email, password, isCompany, ruc });
  return response;
}

export async function fetchLogin(email, password) {
  const response = await axios.post(`${API_URL}/auth/login`, { email, password });
  return response;
}

export const fetchActivityInProgress = async (page) => {
  try {
    const token = await AsyncStorage.getItem('token');
    const url = `${API_URL}/activities/status/IN_PROGRESS?page=${page}&size=10`;
    console.log(url);
    const response = await axios.get(url, {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error al obtener actividades en progreso', error);
    return null;
  }
};

export const fetchSingleActivity = async (id) => {
  try {
    const token = await AsyncStorage.getItem('token');
    const url = `${API_URL}/activities/${id}`;
    console.log(url);
    const response = await axios.get(url, {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error al obtener la actividad', error);
    return null;
  }
};
