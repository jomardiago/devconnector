import { 
    GET_CURRENT_PROFILE_SUCCESS, 
    GET_CURRENT_PROFILE_FAILED, 
    CLEAR_PROFILE, 
    ADD_EDUCATION_SUCCESS, 
    ADD_EXPERIENCE_SUCCESS,
    DELETE_EXPERIENCE_SUCCESS,
    DELETE_EDUCATION_SUCCESS
} from './profileTypes';

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
        case ADD_EXPERIENCE_SUCCESS:
        case ADD_EDUCATION_SUCCESS:
        case DELETE_EXPERIENCE_SUCCESS:
        case DELETE_EDUCATION_SUCCESS:
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