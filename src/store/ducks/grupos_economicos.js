export const Types = {
    ADD_REQUEST: 'grupos_economicos/ADD_REQUEST',
    ADD_SUCCESS: 'grupos_economicos/ADD_SUCCESS',
    ADD_FAILURE: 'grupos_economicos/ADD_FAILURE',

    GET_REQUEST: 'grupos_economicos/GET_REQUEST',
    GET_SUCCESS: 'grupos_economicos/GET_SUCCESS',
    GET_FAILURE: 'grupos_economicos/GET_FAILURE',
};

const INITIAL_STATE = {
    data : null,
    loading : false,
    error : false,    
};

export default function grupos_economicos(state = INITIAL_STATE, action){
    switch (action.type) {
        case Types.ADD_REQUEST:
            return {...state, loading: true, data: action.payload.data};
        case Types.ADD_SUCCESS:
            return {...state, loading: false, error : 'done'};
        case Types.ADD_FAILURE:
            return {...state, loading: false, error : true};

        case Types.GET_REQUEST:
            return {...state, loading: true};
        case Types.GET_SUCCESS:
            return {...state, loading: false, error : false, data: action.payload.data};
        case Types.GET_FAILURE:
            return {...state, loading: false, error : true};

        default:
            return state;
    }
}

export const Creators = {
    addGruposEconomicosRequest : (data) => ({type : Types.ADD_REQUEST, payload: {data}}),
    addGruposEconomicosSuccess : () => ({type: Types.ADD_SUCCESS}),
    addGruposEconomicosFailure : () => ({type: Types.ADD_FAILURE}),

    getGruposEconomicosRequest : () => ({type : Types.GET_REQUEST}),
    getGruposEconomicosSuccess : (data) => ({type: Types.GET_SUCCESS, payload: {data}}),
    getGruposEconomicosFailure : () => ({type: Types.GET_FAILURE}),
}