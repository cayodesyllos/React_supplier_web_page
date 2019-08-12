import { all, takeLatest } from 'redux-saga/effects';
import {Types as FornecedoresTypes} from '../ducks/fornecedores';
import {Types as EnderecoTypes} from '../ducks/endereco';
import {Types as BancosTypes} from '../ducks/bancos';
import {Types as GruposEconomicosTypes} from '../ducks/grupos_economicos';
import {Types as LoginSupplierTypes} from '../ducks/login';
import {Types as CreateLoginTypes} from '../ducks/create_login';
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
import { checkLoginSupplier } from './login_supplier';
import { checkLoginSupplierToken } from './login_supplier';
import { createLogin } from './create_login'

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
        takeLatest(LoginSupplierTypes.POST_REQUEST, checkLoginSupplier),
        takeLatest(LoginSupplierTypes.POST_REQUEST_TOKEN, checkLoginSupplierToken),
        takeLatest(CreateLoginTypes.ADD_REQUEST, createLogin),
    ]);
    
}