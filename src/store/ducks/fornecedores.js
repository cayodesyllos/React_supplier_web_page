export const Types = {
    ADD_REQUEST: 'fornecedores/ADD_REQUEST',
    ADD_SUCCESS: 'fornecedores/ADD_SUCCESS',
    ADD_FAILURE: 'fornecedores/ADD_FAILURE',

    GET_GP_REQUEST: 'fornecedores/GET_GP_REQUEST',
    GET_GP_SUCCESS: 'fornecedores/GET_GP_SUCCESS',
    GET_GP_FAILURE: 'fornecedores/GET_GP_FAILURE',

    GET_FISCAL_REQUEST: 'fornecedores/GET_FISCAL_REQUEST',
    GET_FISCAL_SUCCESS: 'fornecedores/GET_FISCAL_SUCCESS',
    GET_FISCAL_FAILURE: 'fornecedores/GET_FISCAL_FAILURE',

    GET_APROVED_REQUEST: 'fornecedores/GET_APROVED_REQUEST',
    GET_APROVED_SUCCESS: 'fornecedores/GET_APROVED_SUCCESS',
    GET_APROVED_FAILURE: 'fornecedores/GET_APROVED_FAILURE',

    UPDATE_REQUEST: 'fornecedores/UPDATE_REQUEST',
    UPDATE_SUCCESS: 'fornecedores/UPDATE_SUCCESS',
    UPDATE_FAILURE: 'fornecedores/UPDATE_FAILURE',

    DELETE_REQUEST: 'fornecedores/DELETE_REQUEST',
    DELETE_SUCCESS: 'fornecedores/DELETE_SUCCESS',
    DELETE_FAILURE: 'fornecedores/DELETE_FAILURE',
};

const INITIAL_STATE = {
    data : null,
    loading : false,
    error : false,

    data_gp : null,
    loading_gp : true,
    error_fiscal : false,

    data_fiscal : null,
    loading_fiscal : true,
    error_fiscal : false,

    data_aproved : null,
    loading_aproved : true,
    error_aproved : false,

    
};

export default function fornecedores(state = INITIAL_STATE, action){
    switch (action.type) {
        case Types.ADD_REQUEST:
            return {...state, loading: true, data: action.payload.data};
        case Types.ADD_SUCCESS:
            return {...state, loading: false, error : 'done'};
        case Types.ADD_FAILURE:
            return {...state, loading: false, error : true};

        case Types.UPDATE_REQUEST:
            return {...state, loading: true, data: action.payload.data};
        case Types.UPDATE_SUCCESS:
            return {...state, loading: false, error : 'done'};
        case Types.UPDATE_FAILURE:
            return {...state, loading: false, error : true};

        case Types.GET_GP_REQUEST:
            return {...state, loading_gp: true};
        case Types.GET_GP_SUCCESS:
            return {...state, loading_gp: false, error_gp : false, data_gp: action.payload.data};
        case Types.GET_GP_FAILURE:
            return {...state, loading_gp: false, error_gp : true};

        case Types.GET_FISCAL_REQUEST:
            return {...state, loading_fiscal: true};
        case Types.GET_FISCAL_SUCCESS:
            return {...state, loading_fiscal: false, error_fiscal : false, data_fiscal: action.payload.data};
        case Types.GET_FISCAL_FAILURE:
            return {...state, loading_fiscal: false, error_fiscal : true};

        case Types.GET_APROVED_REQUEST:
            return {...state, loading_aproved: true};
        case Types.GET_APROVED_SUCCESS:
            return {...state, loading_aproved: false, error_aproved : false, data_aproved: action.payload.data};
        case Types.GET_APROVED_FAILURE:
            return {...state, loading_aproved: false, error_aproved : true};

        case Types.DELETE_REQUEST:
            return {...state, loading: true, data: action.payload.data};
        case Types.DELETE_SUCCESS:
            return {...state, loading: false, error : false};
        case Types.DELETE_FAILURE:
            return {...state, loading: false, error : true};

        default:
            return state;
    }
}

export const Creators = {
    addFornecedoresRequest : (data) => ({type : Types.ADD_REQUEST, payload: {data}}),
    addFornecedoresSuccess : () => ({type: Types.ADD_SUCCESS}),
    addFornecedoresFailure : () => ({type: Types.ADD_FAILURE}),

    updateFornecedoresRequest : (data) => ({type : Types.UPDATE_REQUEST, payload: {data}}),
    updateFornecedoresSuccess : () => ({type: Types.UPDATE_SUCCESS}),
    updateFornecedoresFailure : () => ({type: Types.UPDATE_FAILURE}),

    getGpFornecedoresRequest : () => ({type : Types.GET_GP_REQUEST}),
    getGpFornecedoresSuccess : (data) => ({type: Types.GET_GP_SUCCESS, payload: {data}}),
    getGpFornecedoresFailure : () => ({type: Types.GET_GP_FAILURE}),

    getFiscalFornecedoresRequest : () => ({type : Types.GET_FISCAL_REQUEST}),
    getFiscalFornecedoresSuccess : (data) => ({type: Types.GET_FISCAL_SUCCESS, payload: {data}}),
    getFiscalFornecedoresFailure : () => ({type: Types.GET_FISCAL_FAILURE}),

    getAprovedFornecedoresRequest : () => ({type : Types.GET_APROVED_REQUEST}),
    getAprovedFornecedoresSuccess : (data) => ({type: Types.GET_APROVED_SUCCESS, payload: {data}}),
    getAprovedFornecedoresFailure : () => ({type: Types.GET_APROVED_FAILURE}),

    deleteFornecedoresRequest : (data) => ({type : Types.DELETE_REQUEST, payload: {data}}),
    deleteFornecedoresSuccess : () => ({type: Types.DELETE_SUCCESS}),
    deleteFornecedoresFailure : () => ({type: Types.DELETE_FAILURE}),
}