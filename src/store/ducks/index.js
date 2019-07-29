import {combineReducers} from 'redux';
import fornecedores from './fornecedores';
import endereco from './endereco';
import bancos from './bancos';
import grupos_economicos from './grupos_economicos';

export default combineReducers({fornecedores, endereco, bancos, grupos_economicos});