let apiAddress = null;
if (process.env.NODE_ENV === 'development') {
    apiAddress = 'http://localhost:3000'
}
else{
    apiAddress = 'https://back-portal-fornecedores.herokuapp.com'
}


export default apiAddress;