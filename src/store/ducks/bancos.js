export const Types = {
    GET_REQUEST: 'bancos/GET_REQUEST',
    GET_SUCCESS: 'bancos/GET_SUCCESS',
};

const INITIAL_STATE = {
    data : null,
    loading : true,
};

export default function bancos(state = INITIAL_STATE, action){
    switch (action.type) {
        case Types.GET_REQUEST:
            return {...state, loading: true};
        case Types.GET_SUCCESS:
            return {...state, loading: false, data: action.payload.data};
        default:
            return state;
    }
}

export const Creators = {
    getBancosRequest : () => ({type : Types.GET_REQUEST}),
    getBancosSuccess : data => ({type: Types.GET_SUCCESS, payload: {data}}),
}