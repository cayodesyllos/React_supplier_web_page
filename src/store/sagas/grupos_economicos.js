import {call, put} from 'redux-saga/effects';
import api from '../../services/api';
import {Creators as GruposEconomicosActions} from '../ducks/grupos_economicos';
import '../../config/reactotron';

export function* addGruposEconomicos(data) {
    try{
        yield call(api.post, '/grupo_economico', data.payload.data);
        yield put(GruposEconomicosActions.addGruposEconomicosSuccess())
    } catch (err) {
        yield put(GruposEconomicosActions.addGruposEconomicosFailure())
    }    
}

export function* getGruposEconomicos() {
    try{
        let response = yield call(api.get, `/grupo_economico`);
        yield put(GruposEconomicosActions.getGruposEconomicosSuccess(response.data));
    } catch (err) {
        yield put(GruposEconomicosActions.getGruposEconomicosFailure());
    } 
}