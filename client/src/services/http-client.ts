import axios  from 'axios';


const token = localStorage.getItem("authToken");
console.log(process.env)
const httpClient = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 60000,
  headers: { 'Content-type': 'Application/json', Authorization: `Bearer ${token}` },
});

//export const API_BASE_URL = httpClient;

export default httpClient;
