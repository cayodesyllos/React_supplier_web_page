export const Types = {
    ADD_REQUEST: 'login_creation/ADD_REQUEST',
    ADD_SUCCESS: 'login_creation/ADD_SUCCESS',
    ADD_FAILURE: 'login_creation/ADD_FAILURE',

};

const INITIAL_STATE = {
    data : null,
    loading : false,
    error : false,    
};

export default function login_creation(state = INITIAL_STATE, action){
    switch (action.type) {
        case Types.ADD_REQUEST:
            return {...state, loading: true, data: action.payload.data};
        case Types.ADD_SUCCESS:
            return {...state, loading: false, error : 'done'};
        case Types.ADD_FAILURE:
            return {...state, loading: false, error : false};

        default:
            return state;
    }
}

export const Creators = {
    addLoginCreationRequest : (data) => ({type : Types.ADD_REQUEST, payload: {data}}),
    addLoginCreationSuccess : () => ({type: Types.ADD_SUCCESS}),
    addLoginCreationFailure : () => ({type: Types.ADD_FAILURE}),
}