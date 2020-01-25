import { SET_ALERT } from './alertTypes';

export const setAlert = (msg, alertType) => ({
    type: SET_ALERT,
    payload: { msg, alertType }
});