import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';

import { REGISTER_START, REGISTER_SUCCESS, REGISTER_FAIL, LOAD_USER, USER_LOADED, LOAD_USER_FAIL } from './authTypes';
import { setAlert } from '../alert/alertActions';
import setAuthToken from '../../utils/setAuthToken';

const config = { headers: { 'Content-Type': 'application/json' } };

export async function registerUser(body) {
    const res = await axios.post('/api/users', body, config);
    return res.data;
}

export function* registerWorker(action) {
    console.log('registerWorker hit: ', action);

    const body = JSON.stringify({ ...action.payload });
    try {
        const data = yield call(registerUser, body);
        yield put({ type: REGISTER_SUCCESS, payload: data });
        action.dispatch({ type: LOAD_USER });
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => action.dispatch(setAlert(error.msg, 'danger')));
        }

        yield put({ type: REGISTER_FAIL });
    }
}

export async function getUser() {
    const res = await axios.get('/api/auth');
    return res.data;
}

export function* loadUserWorker(action) {
    console.log('loadUserWorker hit: ', action);
    if (localStorage.getItem('token')) setAuthToken(localStorage.getItem('token'));

    try {
        const data = yield call(getUser);
        yield put({ type: USER_LOADED, payload: data });
    } catch (err) {
        console.log(err);
        yield put({ type: LOAD_USER_FAIL });
    }
}

export function* register() {
    yield takeLatest(REGISTER_START, registerWorker);
}

export function* loadUser() {
    yield takeLatest(LOAD_USER, loadUserWorker);
}