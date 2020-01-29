import { all, call } from 'redux-saga/effects';

import { setAlert } from './alert/alertSagas';
import { register, loadUser, loginUser } from './auth/authSagas';

import { 
    getCurrentProfile, 
    createOrUpdateProfile, 
    addExperienceSaga, 
    addEducationSaga,
    deleteExperienceSaga,
    deleteEducationSaga,
    deleteAccountSaga,
    getAllProfilesSaga,
    getProfileByIdSaga,
    getGithubReposSaga
} from './profile/profileSagas';

import { 
    getPostsSaga,
    likePostSaga,
    unlikePostSaga
} from './post/postSagas';

export default function* rootSaga() {
    yield all([
        call(setAlert),
        call(register),
        call(loadUser),
        call(loginUser),
        call(getCurrentProfile),
        call(createOrUpdateProfile),
        call(addExperienceSaga),
        call(addEducationSaga),
        call(deleteExperienceSaga),
        call(deleteEducationSaga),
        call(deleteAccountSaga),
        call(getAllProfilesSaga),
        call(getProfileByIdSaga),
        call(getGithubReposSaga),
        call(getPostsSaga),
        call(likePostSaga),
        call(unlikePostSaga)
    ]);
}