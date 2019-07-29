import { all, takeLatest } from 'redux-saga/effects';
import {Types as FornecedoresTypes} from '../ducks/fornecedores';
import {Types as EnderecoTypes} from '../ducks/endereco';
import {Types as BancosTypes} from '../ducks/bancos';
import {Types as GruposEconomicosTypes} from '../ducks/grupos_economicos';
import { addFornecedores} from './fornecedores';
import { updateFornecedores} from './fornecedores';
import { getGpFornecedores} from './fornecedores';
import { getFiscalFornecedores} from './fornecedores';
import { getAprovedFornecedores} from './fornecedores';
import { deleteFornecedores} from './fornecedores';
import { getEndereco } from './endereco';
import { getBancos } from './bancos';
import { getGruposEconomicos } from './grupos_economicos';
import { addGruposEconomicos } from './grupos_economicos';

export default function* rootSaga() {
    
    yield all([
        takeLatest(FornecedoresTypes.ADD_REQUEST, addFornecedores),
        takeLatest(FornecedoresTypes.UPDATE_REQUEST, updateFornecedores),
        takeLatest(FornecedoresTypes.DELETE_REQUEST, deleteFornecedores),
        takeLatest(FornecedoresTypes.GET_GP_REQUEST, getGpFornecedores),
        takeLatest(FornecedoresTypes.GET_FISCAL_REQUEST, getFiscalFornecedores),
        takeLatest(FornecedoresTypes.GET_APROVED_REQUEST, getAprovedFornecedores),
        takeLatest(EnderecoTypes.GET_REQUEST, getEndereco),
        takeLatest(BancosTypes.GET_REQUEST, getBancos),
        takeLatest(GruposEconomicosTypes.GET_REQUEST, getGruposEconomicos),
        takeLatest(GruposEconomicosTypes.ADD_REQUEST, addGruposEconomicos),
    ]);
    
}