import axios from 'axios';

//const myBaseUrl = "http://128.199.32.128/";
const myBaseUrl = 'http://gateway.bolead.creo.tn/services/inspections/api/';

//add your BASE_URL
const token = localStorage.getItem('token');
export const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL || myBaseUrl,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'Accept-Language': 'en',
        Authorization: `Bearer ${token}`
    }
});