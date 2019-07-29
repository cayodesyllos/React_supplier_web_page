import axios from 'axios';
let apiEndereco = null;
apiEndereco = axios.create({
    baseURL : 'https://viacep.com.br/ws/',
    
    })

export default apiEndereco;