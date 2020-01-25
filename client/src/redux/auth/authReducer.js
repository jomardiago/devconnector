import { REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, LOAD_USER_FAIL } from './authTypes';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null
};

export default function(state = initialState, action) {
    switch (action.type) {
        case REGISTER_SUCCESS:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                loading: false
            };
        case REGISTER_FAIL:
        case LOAD_USER_FAIL:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false
            };
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: action.payload
            };
        default:
            return state;
    }
}