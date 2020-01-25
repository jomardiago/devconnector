import { takeLatest, put, delay } from 'redux-saga/effects';
import uuid from 'uuid';

import { SET_ALERT, SET_ALERT_SUCCESS, REMOVE_ALERT } from './alertTypes';

export function* setAlertWorker(action) {
    const id = uuid.v4();
    yield put({ type: SET_ALERT_SUCCESS, payload: {...action.payload, id} });
    yield delay(5000);
    yield put({ type: REMOVE_ALERT });
}

export function* setAlert() {
    yield takeLatest(SET_ALERT, setAlertWorker);
}