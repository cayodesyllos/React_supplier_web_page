import {call, put} from 'redux-saga/effects';
import api from '../../services/api';
import {Creators as FornecedoresActions} from '../ducks/fornecedores';
import '../../config/reactotron';

export function* addFornecedores(data) {
    try{
        yield call(api.post, '/fornecedor', data.payload.data);
        yield put(FornecedoresActions.addFornecedoresSuccess())
    } catch (err) {
        yield put(FornecedoresActions.addFornecedoresFailure())
    }
    
}

export function* updateFornecedores(data) {
    try{
        yield call(api.put, '/fornecedor', data.payload.data);

        yield put(FornecedoresActions.getGpFornecedoresRequest());
        yield put(FornecedoresActions.getFiscalFornecedoresRequest());
        yield put(FornecedoresActions.getAprovedFornecedoresRequest());
        yield put(FornecedoresActions.getRejectedFornecedoresRequest());

        yield put(FornecedoresActions.updateFornecedoresSuccess())
    } catch (err) {
        yield put(FornecedoresActions.updateFornecedoresFailure())
    }
    
}

export function* updateRejectFornecedores(data) {
    try{
        let cnpj = data.payload.data;
        yield call(api.put, `/fornecedor/reject/${cnpj}`, data.payload.data);
        yield put(FornecedoresActions.getGpFornecedoresRequest());
        yield put(FornecedoresActions.getRejectedFornecedoresRequest());
        yield put(FornecedoresActions.updateRejectionFornecedoresSuccess())
    } catch (err) {
        yield put(FornecedoresActions.updateRejectionFornecedoresFailure())
    }
    
}

export function* updateRevertRejectionFornecedores(data) {
    try{
        let cnpj = data.payload.data;
        yield call(api.put, `/fornecedor/revert_rejection/${cnpj}`, data.payload.data);
        yield put(FornecedoresActions.getGpFornecedoresRequest());
        yield put(FornecedoresActions.getRejectedFornecedoresRequest());
        yield put(FornecedoresActions.updateRevertRejectionFornecedoresSuccess())
    } catch (err) {
        yield put(FornecedoresActions.updateRevertRejectionFornecedoresFailure())
    }
    
}

export function* getGpFornecedores() {
    try{
        let response = yield call(api.get, `/fornecedor/status/gp`);
        yield put(FornecedoresActions.getGpFornecedoresSuccess(response.data));
    } catch (err) {
        yield put(FornecedoresActions.getGpFornecedoresFailure());
    } 
}

export function* getFiscalFornecedores() {
    try{
        let response = yield call(api.get, `/fornecedor/status/fiscal`);
        yield put(FornecedoresActions.getFiscalFornecedoresSuccess(response.data));
    } catch (err) {
        yield put(FornecedoresActions.getFiscalFornecedoresFailure());
    } 
}

export function* getAprovedFornecedores() {
    try{
        let response = yield call(api.get, `/fornecedor/status/aprovado`);
        yield put(FornecedoresActions.getAprovedFornecedoresSuccess(response.data));
    } catch (err) {
        yield put(FornecedoresActions.getAprovedFornecedoresFailure());
    } 
}

export function* getRejectedFornecedores() {
    try{
        let response = yield call(api.get, `/fornecedor/status/negado`);
        yield put(FornecedoresActions.getRejectedFornecedoresSuccess(response.data));
    } catch (err) {
        yield put(FornecedoresActions.getRejectedFornecedoresFailure());
    } 
}

export function* deleteFornecedores(data) {
    try{    
        let cnpj = data.payload.data;
        console.tron.log(cnpj)
        yield call(api.delete, `/fornecedor/${cnpj}`);
        yield put(FornecedoresActions.getRejectedFornecedoresRequest());
        yield put(FornecedoresActions.deleteFornecedoresSuccess());
    } catch (err) {
        yield put(FornecedoresActions.deleteFornecedoresFailure());
    } 
}