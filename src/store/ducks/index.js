import {combineReducers} from 'redux';
import fornecedores from './fornecedores';
import endereco from './endereco';
import bancos from './bancos';
import grupos_economicos from './grupos_economicos';
import login from './login';
import create_login from './create_login';

export default combineReducers({fornecedores, endereco, bancos, grupos_economicos, login, create_login});