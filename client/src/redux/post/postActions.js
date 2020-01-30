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

export const deletePostAction = (id, dispatch) => ({
    type: postTypes.DELETE_POST_START,
    payload: id,
    dispatch
});

export const addPostAction = (formData, dispatch) => ({
    type: postTypes.ADD_POST_START,
    payload: formData,
    dispatch
});

export const getPostAction = postId => ({
    type: postTypes.GET_POST_START,
    payload: postId
});