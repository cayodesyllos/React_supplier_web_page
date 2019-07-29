import axios from 'axios';
let api = null;
if (process.env.NODE_ENV === 'development') {
    
    api = axios.create({
        baseURL : 'http://localhost:3000',
        
        })
}
else{
    api = axios.create({
        baseURL : 'http://localhost:3000',
        
        })
}


export default api;