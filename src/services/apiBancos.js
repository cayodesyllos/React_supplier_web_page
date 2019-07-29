import axios from 'axios';
let apiBancos = null;
apiBancos = axios.create({
    baseURL : 'https://www.pagueveloz.com.br/',
    
    })

export default apiBancos;

