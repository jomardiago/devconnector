import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';
import config from '../../utils/getAxiosConfig';

import * as postTypes from './postTypes';
import { setAlert } from '../alert/alertActions';

export async function getPosts() {
    const res = await axios.get('/api/posts');
    return res.data;
}

export async function likePost(postId) {
    const res = await axios.put(`/api/posts/like/${postId}`);
    return res.data;
}

export async function unlikePost(postId) {
    const res = await axios.put(`/api/posts/unlike/${postId}`);
    return res.data;
}

export async function deletePost(postId) {
    const res = await axios.delete(`/api/posts/${postId}`);
    return res.data;
}

export async function addPost(formData) {
    const res = await axios.post('/api/posts', formData, config);
    return res.data;
}

export async function getPost(postId) {
    const res = await axios.get(`/api/posts/${postId}`);
    return res.data;
}

export function* getPostsWorker(action) {
    try {
        const data = yield call(getPosts);
        yield put({ type: postTypes.GET_POSTS_SUCCESS, payload: data });
    } catch (err) {
        yield put({ type: postTypes.GET_POSTS_FAILED, payload: { msg: err.response.statusText, status: err.response.status } });
    }
}

export function* likePostWorker(action) {
    try {
        const data = yield call(likePost, action.payload);
        yield put({ type: postTypes.LIKE_POST_SUCCESS, payload: { id: action.payload, likes: data } });
    } catch (err) {
        yield put({ type: postTypes.LIKE_POST_FAILED, payload: { msg: err.response.statusText, status: err.response.status } });
    }
}

export function* unlikePostWorker(action) {
    try {
        const data = yield call(unlikePost, action.payload);
        yield put({ type: postTypes.UNLIKE_POST_SUCCESS, payload: { id: action.payload, likes: data } });
    } catch (err) {
        yield put({ type: postTypes.UNLIKE_POST_FAILED, payload: { msg: err.response.statusText, status: err.response.status } });
    }
}

export function* deletePostWorker(action) {
    try {
        yield call(deletePost, action.payload);
        yield put({ type: postTypes.DELETE_POST_SUCCESS, payload: action.payload });
        action.dispatch(setAlert('Post Removed.', 'success'));
    } catch (err) {
        yield put({ type: postTypes.DELETE_POST_FAILED, payload: { msg: err.response.statusText, status: err.response.status } });
    }
}

export function* addPostWorker(action) {
    try {
        const data = yield call(addPost, action.payload);
        yield put({ type: postTypes.ADD_POST_SUCCESS, payload: data });
        action.dispatch(setAlert('Post Created.', 'success'));
    } catch (err) {
        yield put({ type: postTypes.ADD_POST_FAILED, payload: { msg: err.response.statusText, status: err.response.status } });
    }
}

export function* getPostWorker(action) {
    try {
        const data = yield call(getPost, action.payload);
        yield put({ type: postTypes.GET_POST_SUCCESS, payload: data });
    } catch (err) {
        yield put({ type: postTypes.GET_POST_FAILED, payload: { msg: err.response.statusText, status: err.response.status } });
    }
}

export function* getPostsSaga() {
    yield takeLatest(postTypes.GET_POSTS_START, getPostsWorker);
}

export function* likePostSaga() {
    yield takeLatest(postTypes.LIKE_POST_START, likePostWorker);
}

export function* unlikePostSaga() {
    yield takeLatest(postTypes.UNLIKE_POST_START, unlikePostWorker);
}

export function* deletePostSaga() {
    yield takeLatest(postTypes.DELETE_POST_START, deletePostWorker);
}

export function* addPostSaga() {
    yield takeLatest(postTypes.ADD_POST_START, addPostWorker);
}

export function* getPostSaga() {
    yield takeLatest(postTypes.GET_POST_START, getPostWorker);
}

export async function addComment(postId, formData) {
    const res = await axios.post(`/api/posts/comment/${postId}`, formData, config);
    return res.data;
}

export function* addCommentWorker(action) {
    const { postId, formData } = action.payload;
    try {
        const data = yield call(addComment, postId, formData);
        yield put({ type: postTypes.ADD_COMMENT_SUCCESS, payload: data });
        action.dispatch(setAlert('Comment Added.', 'success'));
    } catch (err) {
        yield put({ type: postTypes.ADD_COMMENT_FAILED, payload: { msg: err.response.statusText, status: err.response.status } });
    }
}

export function* addCommentSaga() {
    yield takeLatest(postTypes.ADD_COMMENT_START, addCommentWorker);
}

export async function removeComment(postId, commentId) {
    const res = await axios.delete(`/api/posts/comment/${postId}/${commentId}`);
    return res.data;
}

export function* removeCommentWorker(action) {
    const { postId, commentId } = action.payload;
    try {
        yield call(removeComment, postId, commentId);
        yield put({ type: postTypes.REMOVE_COMMENT_SUCCESS, payload: commentId });
        action.dispatch(setAlert('Comment Removed.', 'success'));
    } catch (err) {
        yield put({ type: postTypes.REMOVE_COMMENT_FAILED, payload: { msg: err.response.statusText, status: err.response.status } });
    }
}

export function* removeCommentSaga() {
    yield takeLatest(postTypes.REMOVE_COMMENT_START, removeCommentWorker);
}