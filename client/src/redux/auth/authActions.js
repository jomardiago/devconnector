import { REGISTER_START, LOAD_USER } from './authTypes';

export const register = ({ name, email, password }, dispatch) => ({
    type: REGISTER_START,
    payload: { name, email, password },
    dispatch
});

export const loadUser = () => ({
    type: LOAD_USER
});