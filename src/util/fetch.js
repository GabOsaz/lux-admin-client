import axios from 'axios';

const publicFetch = axios.create({
  baseURL: 'https://lux-admin-api.herokuapp.com/api'
});

export { publicFetch };
