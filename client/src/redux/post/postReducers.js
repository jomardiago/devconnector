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
        case postTypes.LIKE_POST_FAILED:
        case postTypes.UNLIKE_POST_FAILED:
            return {
                ...state,
                error: {},
                loading: false
            };
        case postTypes.LIKE_POST_SUCCESS:
        case postTypes.UNLIKE_POST_SUCCESS:
            return {
                ...state,
                posts: state.posts.map(post => post._id === payload.id ? { ...post, likes: payload.likes } : post),
                loading: false
            };
        default:
            return state;
    }
}