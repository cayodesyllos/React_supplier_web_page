import {call, put} from 'redux-saga/effects';
import apiEndereco from '../../services/apiEndereco';
import {Creators as EnderecoActions} from '../ducks/endereco';
import '../../config/reactotron';
export function* getEndereco(data) {
    try{
        let url_end = '/' + data.payload.data + '/json/';
        const response = yield call(apiEndereco.get, url_end);
        yield put(EnderecoActions.getEnderecoSuccess(response.data))
    } catch (err) {
        console.tron.log("@@@@@@@@", err);
    }
    
}