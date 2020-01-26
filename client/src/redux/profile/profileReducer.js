import { GET_CURRENT_PROFILE_SUCCESS, GET_CURRENT_PROFILE_FAILED, CLEAR_PROFILE } from './profileTypes';

const initialState = {
    profile: null,
    profiles: [],
    repos: [],
    loading: true,
    error: {}
}

export default function(state = initialState, action) {
    const { type, payload } = action;
    
    switch (type) {
        case CLEAR_PROFILE:
            return {
                ...initialState
            };
        case GET_CURRENT_PROFILE_SUCCESS:
            return {
                ...state,
                profile: payload,
                loading: false
            };
        case GET_CURRENT_PROFILE_FAILED:
            return {
                ...state,
                error: payload,
                loading: false
            };
        default:
            return state;
    }
}