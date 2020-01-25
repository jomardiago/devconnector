import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';

import { REGISTER_START, REGISTER_SUCCESS, REGISTER_FAIL } from './authTypes';
import { setAlert } from '../alert/alertActions';

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
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => action.dispatch(setAlert(error.msg, 'danger')));
        }

        yield put({ type: REGISTER_FAIL });
    }
}

export function* register() {
    yield takeLatest(REGISTER_START, registerWorker);
}