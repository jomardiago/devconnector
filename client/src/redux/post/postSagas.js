import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';

import * as postTypes from './postTypes';

export async function getPosts() {
    const res = await axios('/api/posts');
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

export function* getPostsSaga() {
    yield takeLatest(postTypes.GET_POSTS_START, getPostsWorker);
}