import { 
    REGISTER_SUCCESS, 
    REGISTER_FAIL, 
    USER_LOADED, 
    LOAD_USER_FAIL, 
    LOGIN_SUCCESS, 
    LOGIN_FAIL, 
    LOGOUT,
} from './authTypes';

import { DELETE_ACCOUNT_SUCCESS } from '../profile/profileTypes'; 

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null
};

export default function(state = initialState, action) {
    switch (action.type) {
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                loading: false
            };
        case REGISTER_FAIL:
        case LOAD_USER_FAIL:
        case LOGIN_FAIL:
        case LOGOUT:
        case DELETE_ACCOUNT_SUCCESS:
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