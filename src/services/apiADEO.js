import axios from 'axios';

const data = {
    url: 'https://api.adeodev.org/',
  };
  
  const apiADEO = axios.create({
    baseURL: data.url,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    responseType: 'json',
  });
  
  apiADEO.interceptors.request.use(
    async config => {
      const token = await localStorage.getItem('auth_token');
      if (token !== null) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    error => Promise.reject(error),
  );
  apiADEO.interceptors.response.use(config => config, error => Promise.reject(error));
  
  export default apiADEO;