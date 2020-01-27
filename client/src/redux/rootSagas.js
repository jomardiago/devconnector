import { all, call } from 'redux-saga/effects';

import { setAlert } from './alert/alertSagas';
import { register, loadUser, loginUser } from './auth/authSagas';
import { getCurrentProfile, createOrUpdateProfile, addExperienceSaga, addEducationSaga } from './profile/profileSagas';

export default function* rootSaga() {
    yield all([
        call(setAlert),
        call(register),
        call(loadUser),
        call(loginUser),
        call(getCurrentProfile),
        call(createOrUpdateProfile),
        call(addExperienceSaga),
        call(addEducationSaga)
    ]);
}