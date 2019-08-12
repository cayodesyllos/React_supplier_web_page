let apiAddress = null;
if (process.env.NODE_ENV === 'development') {
    apiAddress = 'http://localhost:3000'
}
else{
    apiAddress = 'http://localhost:3000'
}


export default apiAddress;