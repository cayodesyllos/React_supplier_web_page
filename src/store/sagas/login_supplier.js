import {call, put} from 'redux-saga/effects';
import api from '../../services/api';
import {Creators as SupplierLoginActions} from '../ducks/login';
import '../../config/reactotron';

export function* checkLoginSupplier(data) {
    try{
        let response = yield call(api.post, '/login', data.payload.data);
        console.tron.log('responseeee', response);
        yield put(SupplierLoginActions.postLoginSupplierSuccess())
        localStorage.setItem('cnpj', data.payload.data.cnpj);
        localStorage.setItem('token', response.data.token);
        
    } catch (err) {
        yield put(SupplierLoginActions.postLoginSupplierFailure())
        console.tron.log('***************>', 'errou')

    }    
}


export function* checkLoginSupplierToken(data) {
    try{
        console.tron.log('checkLoginSupplierToken');
        let response = yield call(api.post, '/login_token', data.payload.data);
        console.tron.log('responseeee', response);
        yield put(SupplierLoginActions.postLoginSupplierSuccess())
        localStorage.setItem('cnpj', data.payload.data.cnpj);
        localStorage.setItem('token', response.data.token);
    } catch (err) {
        yield put(SupplierLoginActions.postLoginSupplierFailure())
        console.tron.log('***************>', 'errou')

    }    
}