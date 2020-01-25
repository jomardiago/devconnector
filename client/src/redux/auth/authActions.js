import { REGISTER_START } from './authTypes';

export const register = ({ name, email, password }, dispatch) => ({
    type: REGISTER_START,
    payload: { name, email, password },
    dispatch
});