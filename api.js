import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import * as SecureStore from 'expo-secure-store';
import { jwtDecode } from 'jwt-decode';


const API_URL = 'http://192.168.1.38:8080'; //Cambiar por tu ip


export const getRoleBasedOnToken = () => {
  const token = localStorage.getItem('token');
  const decodedToken = jwtDecode(token);
  console.log(decodedToken.role);
  return decodedToken.role;
}

export async function fetchRegister(name, email, password, isCompany, ruc){
  const response = await axios.post(`${API_URL}/auth/register`, {name, email, password, isCompany, ruc});
  return response;
}

export async function fetchLogin(email, password){
  const response = await axios.post(`${API_URL}/auth/login`, {email, password});
  return response;
}

export const fetchActivityInProgress = async(page) => {
  const url = `${API_URL}/activities/status/IN_PROGRESS?page=${page}&size=10`;
  console.log(url);
  const response = await axios.get(url, {
      headers:{'Authorization' : `Bearer ${token}`,},
  });
  console.log(response.data);
  return response.data;
}

export const fetchSingleActivity = async(id) => {
  const url = `${API_URL}/activities/${id}`;
  console.log(url);
  const response = await axios.get(url, {
      headers:{'Authorization': `Bearer ${token}`,},
  });
  console.log(response.data);
  return response.data;
}