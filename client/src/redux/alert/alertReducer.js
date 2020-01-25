import { REMOVE_ALERT, SET_ALERT_SUCCESS } from './alertTypes';

const initialState = [];

export default (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case SET_ALERT_SUCCESS:
            return [
                ...state,
                payload
            ];
        case REMOVE_ALERT: 
            return state.filter(alert => alert.id !== payload)
        default:
            return state;
    }
};