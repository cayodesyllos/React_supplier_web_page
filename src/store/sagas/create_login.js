import {call, put} from 'redux-saga/effects';
import api from '../../services/api';
import {Creators as LoginCreationActions} from '../ducks/create_login';
import '../../config/reactotron';

export function* createLogin(data) {
    try{
        yield call(api.post, '/login/create', data.payload.data);
        yield put(LoginCreationActions.addLoginCreationSuccess())
    } catch (err) {
        yield put(LoginCreationActions.addLoginCreationFailure())
    }    
}