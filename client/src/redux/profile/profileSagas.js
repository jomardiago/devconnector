import axios from 'axios';
import { takeLatest, call, put } from 'redux-saga/effects';

import { 
    GET_CURRENT_PROFILE_START, 
    GET_CURRENT_PROFILE_SUCCESS, 
    GET_CURRENT_PROFILE_FAILED, 
    CREATE_OR_UPDATE_PROFILE_START, 
    ADD_EXPERIENCE_START,
    ADD_EXPERIENCE_SUCCESS,
    ADD_EDUCATION_START,
    ADD_EDUCATION_SUCCESS,
    DELETE_EXPERIENCE_START,
    DELETE_EXPERIENCE_SUCCESS,
    DELETE_EDUCATION_START,
    DELETE_EDUCATION_SUCCESS,
    DELETE_ACCOUNT_START,
    DELETE_ACCOUNT_SUCCESS,
    CLEAR_PROFILE,
    GET_ALL_PROFILES_START,
    GET_ALL_PROFILES_FAILED,
    GET_ALL_PROFILES_SUCCESS,
    GET_PROFILE_BY_ID_START,
    GET_PROFILE_BY_ID_SUCCESS,
    GET_PROFILE_BY_ID_FAILED,
    GET_GITHUB_REPOS_START,
    GET_GITHUB_REPOS_SUCCESS,
    GET_GITHUB_REPOS_FAILED
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
    console.log('createOrUpdateProfileWorker hit: ', action);

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

export async function addProfileExperience(formData) {
    const res = await axios.put('/api/profile/experience', formData, config);
    return res.data;
}

export function* addExperience(action) {
    console.log('addExperience hit: ', action);

    try {
        const data = yield call(addProfileExperience, action.payload.formData);
        yield put({ type: ADD_EXPERIENCE_SUCCESS, payload: data });

        action.payload.dispatch(setAlert('Experience Added', 'success'));

        action.payload.history.push('/dashboard');
    } catch (err) {
        const { statusText, status } = err.response;
        const errors = err.response.data.errors;
        yield put({ type: GET_CURRENT_PROFILE_FAILED, payload: { msg: statusText, status } });

        if (errors) {
            errors.forEach(error => action.payload.dispatch(setAlert(error.msg, 'danger')));
        }
    }
}

export function* addExperienceSaga() {
    yield takeLatest(ADD_EXPERIENCE_START, addExperience);
}

export async function addProfileEducation(formData) {
    const res = await axios.put('/api/profile/education', formData, config);
    return res.data;
}

export function* addEducation(action) {
    console.log('addEducation hit: ', action);

    try {
        const data = yield call(addProfileEducation, action.payload.formData);
        yield put({ type: ADD_EDUCATION_SUCCESS, payload: data });

        action.payload.dispatch(setAlert('Education Added', 'success'));

        action.payload.history.push('/dashboard');
    } catch (err) {
        const { statusText, status } = err.response;
        const errors = err.response.data.errors;
        yield put({ type: GET_CURRENT_PROFILE_FAILED, payload: { msg: statusText, status } });

        if (errors) {
            errors.forEach(error => action.payload.dispatch(setAlert(error.msg, 'danger')));
        }
    }
}

export function* addEducationSaga() {
    yield takeLatest(ADD_EDUCATION_START, addEducation);
}

export async function deleteExperience(id) {
    const res = await axios.delete(`/api/profile/experience/${id}`);
    return res.data;
}

export function* deleteExperienceWorker(action) {
    const { payload } = action;
    const { id, dispatch } = payload;

    try {
        const data = yield call(deleteExperience, id);
        yield put({ type: DELETE_EXPERIENCE_SUCCESS, payload: data });
        dispatch(setAlert('Experience Deleted', 'success'));
    } catch (err) {
        const { statusText, status } = err.response;
        const errors = err.response.data.errors;
        yield put({ type: GET_CURRENT_PROFILE_FAILED, payload: { msg: statusText, status } });

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
    }
}

export function* deleteExperienceSaga() {
    yield takeLatest(DELETE_EXPERIENCE_START, deleteExperienceWorker);
}

export async function deleteEducation(id) {
    const res = await axios.delete(`/api/profile/education/${id}`);
    return res.data;
}

export function* deleteEducationWorker(action) {
    const { payload } = action;
    const { id, dispatch } = payload;

    try {
        const data = yield call(deleteEducation, id);
        yield put({ type: DELETE_EDUCATION_SUCCESS, payload: data });
        dispatch(setAlert('Education Deleted', 'success'));
    } catch (err) {
        const { statusText, status } = err.response;
        const errors = err.response.data.errors;
        yield put({ type: GET_CURRENT_PROFILE_FAILED, payload: { msg: statusText, status } });

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
    }
}

export function* deleteEducationSaga() {
    yield takeLatest(DELETE_EDUCATION_START, deleteEducationWorker);
}

export async function deleteAccount() {
    const res = await axios.delete('/api/profile');
    return res.data;
}

export function* deleteAccountWorker(action) {
    const { payload } = action;
    const { dispatch } = payload;

    if (window.confirm('Are you sure? This can NOT be undone!')) {
        try {
            yield call(deleteAccount);
            yield put({ type: CLEAR_PROFILE });
            yield put({ type: DELETE_ACCOUNT_SUCCESS });
            dispatch(setAlert('Your account has been permanently deleted.'));
        } catch (err) {
            const { statusText, status } = err.response;
            const errors = err.response.data.errors;
            yield put({ type: GET_CURRENT_PROFILE_FAILED, payload: { msg: statusText, status } });
    
            if (errors) {
                errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
            }
        }
    }
}

export function* deleteAccountSaga() {
    yield takeLatest(DELETE_ACCOUNT_START, deleteAccountWorker);
}

export async function getAllProfiles() {
    const res = await axios.get('/api/profile');
    return res.data;
}

export function* getAllProfilesWorker() {
    try {
        yield put({ type: CLEAR_PROFILE });
        const data = yield call(getAllProfiles);
        yield put({ type: GET_ALL_PROFILES_SUCCESS, payload: data });
    } catch (err) {
        const { statusText, status } = err.response;
        yield put({ type: GET_ALL_PROFILES_FAILED, payload: { msg: statusText, status } });
    }
}

export function* getAllProfilesSaga() {
    yield takeLatest(GET_ALL_PROFILES_START, getAllProfilesWorker);
};

export async function getProfileById(userId) {
    const res = await axios.get(`/api/profile/user/${userId}`);
    return res.data;
}

export function* getProfileByIdWorker(action) {
    try {
        const data = yield call(getProfileById, action.payload);
        yield put({ type: GET_PROFILE_BY_ID_SUCCESS, payload: data });
    } catch (err) {
        const { statusText, status } = err.response;
        yield put({ type: GET_PROFILE_BY_ID_FAILED, payload: { msg: statusText, status } });
    }
}

export function* getProfileByIdSaga() {
    yield takeLatest(GET_PROFILE_BY_ID_START, getProfileByIdWorker);
}

export async function getGithubRepos(username) {
    const res = await axios.get(`/api/profile/github/${username}`);
    return res.data;
}

export function* getGithubReposWorker(action) {
    try {
        const data = yield call(getGithubRepos, action.payload);
        yield put({ type: GET_GITHUB_REPOS_SUCCESS, payload: data });
    } catch (err) {
        const { statusText, status } = err.response;
        yield put({ type: GET_GITHUB_REPOS_FAILED, payload: { msg: statusText, status } });
    }
}

export function* getGithubReposSaga() {
    yield takeLatest(GET_GITHUB_REPOS_START, getGithubReposWorker);
}