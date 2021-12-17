import axios from 'axios';

const api = axios.create({
  timeout: 10000,
  baseURL: process.env.NODE_ENV === 'production'
    ? './backend'
    : 'http://products-list'
})

export default api;