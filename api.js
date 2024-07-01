import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { jwtDecode } from 'jwt-decode';


const API_URL = 'http://192.168.1.38:8080';


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