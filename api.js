import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import * as SecureStore from 'expo-secure-store';


const API_URL = 'http://192.168.233.225:8080';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJwZXJydWFub3NAZXhhbXBsZS5jb20iLCJyb2xlIjoiUk9MRV9DT01QQU5ZIiwiaWF0IjoxNzE5ODY0MDcwLCJleHAiOjE3MTk5MDAwNzB9.714XeV6AISgsFmPUx1TGS0kBbEvldBx7xZTfcPqtfDo';

export const getRoleBasedOnToken = () => {
    // const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    return decodedToken.role;
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