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