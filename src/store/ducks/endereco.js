export const Types = {
    GET_REQUEST: 'endereco/GET_REQUEST',
    GET_SUCCESS: 'endereco/GET_SUCCESS',
};

const INITIAL_STATE = {
    data : null,
    loading : true,
};

export default function endereco(state = INITIAL_STATE, action){
    switch (action.type) {
        case Types.GET_REQUEST:
            return {...state, loading: true, data: action.payload.data};
        case Types.GET_SUCCESS:
            return {...state, loading: false, data: action.payload.data};
        default:
            return state;
    }
}

export const Creators = {
    getEnderecoRequest : data => ({type : Types.GET_REQUEST, payload: {data}}),
    getEnderecoSuccess : data => ({type: Types.GET_SUCCESS, payload: {data}}),
}