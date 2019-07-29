import {call, put} from 'redux-saga/effects';
import apiBancos from '../../services/apiBancos';
import {Creators as BancosActions} from '../ducks/bancos';
import '../../config/reactotron';
export function* getBancos() {
    try{
        let url_end = 'api/v1/Bancos';
        const response = yield call(apiBancos.get, url_end);
        yield put(BancosActions.getBancosSuccess(response.data))
    } catch (err) {
        console.tron.log("@@@@@@@@", err);
    }
    
}