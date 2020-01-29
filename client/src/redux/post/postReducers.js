import * as postTypes from './postTypes';

const INITIAL_STATE = {
    posts: [],
    post: null,
    loading: true,
    error: {}
};

export default function(state = INITIAL_STATE, action) {
    const { type, payload } = action;
    switch (type) {
        case postTypes.GET_POSTS_SUCCESS:
            return {
                ...state,
                posts: payload,
                loading: false
            };
        case postTypes.GET_POSTS_FAILED:
            return {
                ...state,
                error: {},
                loading: false,
                posts: []
            };
        default:
            return state;
    }
}