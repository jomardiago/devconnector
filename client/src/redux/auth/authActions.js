import { REGISTER_START, LOAD_USER, LOGIN_START } from './authTypes';

export const register = ({ name, email, password }, dispatch) => ({
    type: REGISTER_START,
    payload: { name, email, password },
    dispatch
});

export const loadUser = () => ({
    type: LOAD_USER
});

export const loginUser = (email, password, dispatch) => ({
    type: LOGIN_START,
    payload: { email, password },
    dispatch
});