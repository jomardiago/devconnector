import * as postTypes from './postTypes';

export const getPostsAction = () => ({
    type: postTypes.GET_POSTS_START
});

export const likePostAction = id => ({
    type: postTypes.LIKE_POST_START,
    payload: id
});

export const unlikePostAction = id => ({
    type: postTypes.UNLIKE_POST_START,
    payload: id
});