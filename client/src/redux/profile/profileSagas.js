import axios from 'axios';
import { takeLatest, call, put } from 'redux-saga/effects';

import { GET_CURRENT_PROFILE_START, GET_CURRENT_PROFILE_SUCCESS, GET_CURRENT_PROFILE_FAILED } from './profileTypes';

export async function getCurrentProfileFromDB() {
    const res = await axios('/api/profile/me');
    return res.data;
}

export function* getCurrentProfileWorker(action) {
    console.log('getCurrentProfileWorker hit: ', action);

    try {
        const currentProfile = yield call(getCurrentProfileFromDB);
        yield put({ type: GET_CURRENT_PROFILE_SUCCESS, payload: currentProfile });
    } catch (err) {
        const { statusText, status } = err.response;
        yield put({ type: GET_CURRENT_PROFILE_FAILED, payload: { msg: statusText, status } });
    }
}

export function* getCurrentProfile() {
    yield takeLatest(GET_CURRENT_PROFILE_START, getCurrentProfileWorker);
}