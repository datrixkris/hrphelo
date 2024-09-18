import axios from 'axios'

const baseURL = "https://hrphelo.wavebeep.com/";

export const api = axios.create({
  baseURL,
  timeout: 50000,
  headers: {
    // 'Access-Control-Allow-Origin': 'http://localhost:5173'
  },
});