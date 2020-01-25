import { SET_ALERT } from './alertTypes';

export const setAlert = (msg, alertType, timeout = 5000) => ({
    type: SET_ALERT,
    payload: { msg, alertType, timeout }
});