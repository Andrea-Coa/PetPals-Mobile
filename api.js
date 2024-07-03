import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://192.168.1.243:8080'; //Cambiar por tu ip

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
    const url = `${API_URL}/activities/status/IN_PROGRESS?page=${page}&size=100`;
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

export const fetchUserProfile = async () => {
  const role = await getRoleBasedOnToken();
  const token = await AsyncStorage.getItem('token');
  
  try {
    if (role == "ROLE_PERSON") {
      const response = await axios.get(`${API_URL}/person/me`, {
        headers: {
          'Authorization':`Bearer ${token}`,
        },
      });
      console.log("api.js:", response.data);
      return response.data;
    }

    if (role == "ROLE_COMPANY"){
      const response = await axios.get(`${API_URL}/company/me`, {
        headers: {
          'Authorization':`Bearer ${token}`,
        },
      });
      console.log("api.js:", response.data);
      return response.data;
    }

  } catch (error) {
    console.error('ERROR FETCHING PROFILE', error);
  }
}

export const updateProfile = async (name, password) => {
  const token = await AsyncStorage.getItem('token');
  
  console.log("Token:", token);
  console.log("API URL:", `${API_URL}/person`);
  console.log("Name:", name);
  console.log("Password:", password);

  try {
    const response = await axios.patch(
      `${API_URL}/person`,
      { name, password },
      {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      }
    );
    console.log("api.js:", response.data);
    return response.data;
  } catch (error) {
    console.error('ERROR UPDATING PROFILE', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const updateCompanyProfile = async (name) => {
  const token = await AsyncStorage.getItem('token');
  
  console.log("Token:", token);
  console.log("API URL:", `${API_URL}/company`);
  console.log("Name:", name);

  try {
    const response = await axios.patch(
      `${API_URL}/company`,
      { name },
      {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      }
    );
    console.log("api.js:", response.data);
    return response.data;
  } catch (error) {
    console.error('ERROR UPDATING COMPANY PROFILE', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const fetchPetsDefault = async (page) => {
  const token = await AsyncStorage.getItem('token');
    const response = await axios.get(`${API_URL}/pets/inAdoption?page=${page}&size=10`, {
      headers: {
        'Authorization':`Bearer ${token}`,
      },
    });
    console.log(response.data);
    return response.data;
}

export const postPet = async(body) => {
  const token = await AsyncStorage.getItem('token');
  try
  {
    await axios.post(`${API_URL}/pets`, body, {
    headers: {
      'Authorization':`Bearer ${token}`,
      },
     });
  } catch(error) {
    console.error('FAILED TO POST PET');
  }
}

export const fetchCreateActivity = async (newActivity) => {
  const token = await AsyncStorage.getItem('token');
  console.log('Token:', token); // Verificar si el token está presente
  try {
    const response = await axios.post(`${API_URL}/activities`, newActivity, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    console.log('Response:', response.data); // Verificar la respuesta
    return response.data;
  } catch (error) {
    console.error('ERROR CREATING ACTIVITY', error.response ? error.response.data : error.message);
    throw error;
  }
};
