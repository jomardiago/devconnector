import axios from 'axios';
import { takeLatest, call, put } from 'redux-saga/effects';

import { 
    GET_CURRENT_PROFILE_START, 
    GET_CURRENT_PROFILE_SUCCESS, 
    GET_CURRENT_PROFILE_FAILED, 
    CREATE_OR_UPDATE_PROFILE_START 
} from './profileTypes';
import config from '../../utils/getAxiosConfig';
import { setAlert } from '../../redux/alert/alertActions';

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

export async function createOrUpdateProfileFromDB(formData) {
    const res = await axios.post('/api/profile', formData, config);
    return res.data;
}

export function* createOrUpdateProfileWorker(action) {
    yield console.log('createOrUpdateProfileWorker hit: ', action);

    try {
        const profile = yield call(createOrUpdateProfileFromDB, action.payload.formData);
        yield put({ type: GET_CURRENT_PROFILE_SUCCESS, payload: profile });

        action.payload.dispatch(setAlert(action.payload.edit ? 'Profile Updated' : 'Profile Created', 'success'));

        if (!action.payload.edit) {
            action.payload.history.push('/dashboard');
        }
    } catch (err) {
        const { statusText, status } = err.response;
        const errors = err.response.data.errors;
        yield put({ type: GET_CURRENT_PROFILE_FAILED, payload: { msg: statusText, status } });

        if (errors) {
            errors.forEach(error => action.payload.dispatch(setAlert(error.msg, 'danger')));
        }
    }
};

export function* createOrUpdateProfile() {
    yield takeLatest(CREATE_OR_UPDATE_PROFILE_START, createOrUpdateProfileWorker);
}