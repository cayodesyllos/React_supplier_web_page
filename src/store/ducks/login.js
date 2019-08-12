import api from '../../services/apiADEO';
import apiGrupoAcesso from '../../services/api';

export const Types = {
    LOGIN_REQUEST: 'login/LOGIN_REQUEST',
    LOGIN_SUCCESS: 'login/LOGIN_SUCCESS',
    LOGIN_FAILURE: 'login/LOGIN_FAILURE',
    LOGIN_UNAUTHORIZED: 'login/LOGIN_UNAUTHORIZED',

    POST_REQUEST: 'login/POST_REQUEST',
    POST_REQUEST_TOKEN: 'login/POST_TOKEN_REQUEST',
    POST_SUCCESS: 'login/POST_SUCCESS',
    POST_FAILURE: 'login/POST_FAILURE',

    LOGOUT: 'login/LOGOUT',
};

const INITIAL_STATE = {
    loading : false,
    error : false,  
    loginUnauth: false,
    grupo_acesso : '',
    logged : false,
    data : null,

    nome : '',
};

export default function login(state = INITIAL_STATE, action){
    switch (action.type) {

        case Types.POST_REQUEST:
            return {...state, loading: true, data: action.payload.data};

        case Types.POST_REQUEST_TOKEN:
            return {...state, loading: true, data: action.payload.data};
        
        case Types.POST_SUCCESS:
            return {...state, loading: false, error : 'done', logged: true, grupo_acesso: 'fornecedor'};
        
        case Types.POST_FAILURE:
            return {...state, loading: false, error : true, logged: false};

        case Types.LOGIN_REQUEST:
            return {
            ...state,
            loading: true,
            };

        case Types.LOGIN_SUCCESS:
            return {
            ...state,
            loading: false,
            logged : true,
            grupo_acesso : action.payload.acesso,
            nome : action.payload.nome,
            };
    
      
        case Types.LOGIN_FAILURE:
            return {
            ...state,
            error: true,
            loading: false,
            logged: false
            };
  
        case Types.LOGIN_UNAUTHORIZED:
            return {
            ...state,
            error: true,
            loginUnauth: true,
            loading: false,
            };

        case Types.LOGOUT:
            return {
            ...state,
            loginUnauth: false,
            loginError: false,
            logged : false,
            loading: true,
            grupo_acesso : '',
            nome : '',
            }
  
      default:
        return state;
    }
  };

  export const Creators = {
    postLoginSupplierRequest : (data) => ({type : Types.POST_REQUEST, payload: {data}}),
    postLoginSupplierRequestToken : (data) => ({type : Types.POST_REQUEST_TOKEN, payload: {data}}),
    postLoginSupplierSuccess : () => ({type: Types.POST_SUCCESS}),
    postLoginSupplierFailure : () => ({type: Types.POST_FAILURE}),
}


  //FACEBOOK RESPONSE AND LOGIN
  export const handleFacebookLogin = res => async dispatch => {
    dispatch({ type:  Types.LOGIN_REQUEST });
    if (res.accessToken) {
      var last_name = res.name.substr(res.name.indexOf(' ') + 1); //Extract the first name as the  substring before the first space
      var first_name = res.name.substr(0, res.name.indexOf(' ') + 1); //Extract the last name as the  substring after the first space
      var body_post = {
        profile: {
          id: res.userID,
          first_name: first_name,
          last_name: last_name,
          email: res.email,
        },
      };
      const urlLogin = '/auth/users/facebook';
      await api
        .post(urlLogin, body_post)
        .then(res2 => {
          localStorage.setItem('auth_token', res2.data.jwt);
          window.location.href = '../portal/';
        })
        .catch(error => {
          console.log(error);
          dispatch({ type:  Types.LOGIN_FAILURE });
        });
    } else {
      console.log('Login Error');
      dispatch({ type:  Types.LOGIN_FAILURE });
    }
  };
  
  export const handleSubmit = (email, password) => async dispatch => {
    dispatch({ type:  Types.LOGIN_REQUEST });
    var body_post = {
      email: email,
      password: password,
    };
    const urlLogin = '/auth/users/login';
    await api
      .post(urlLogin, { email: body_post.email, password: body_post.password })
      .then(res => {
        localStorage.setItem('auth_token', res.data.jwt);
        window.location.href = '../portal/';
      })
      .catch(error => {
        console.log(error);
        dispatch({ type:  Types.LOGIN_FAILURE });
      });
  };
  
  export const getAuthUserRequest = () => async dispatch => {
    
    const urlAuth = '/user/inhabitants/me';
    await api
      .get(urlAuth) 
      .then(async res => {
        // console.log(res);      
        if (res.data.data.attributes.coworker) {
          let grupo;
          try {
            grupo = await apiGrupoAcesso.post('/grupo_acesso', { 'nome' : res.data.data.attributes.name});
            grupo = grupo.data.grupo_acesso;
          } catch (error) {
            dispatch({ type:  Types.LOGIN_UNAUTHORIZED });
          }
          let pay = {nome : res.data.data.attributes.name, acesso : grupo}
          dispatch({ type:  Types.LOGIN_SUCCESS, payload: pay });
                    
        } else {
          console.log('unauthorized user');
          dispatch({ type:  Types.LOGIN_UNAUTHORIZED });
        }
      })
      .catch(e => {
        console.log(e);
        dispatch({ type:  Types.LOGIN_FAILURE });
      });
  };
  
  export const handleLogout = () => async dispatch => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('cnpj');
    localStorage.removeItem('token');
    window.location.href = '../login';
    dispatch({ type:  Types.LOGOUT });
  };
  