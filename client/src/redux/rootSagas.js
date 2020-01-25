import { all, call } from 'redux-saga/effects';

import { setAlert } from './alert/alertSagas';
import { register, loadUser, loginUser } from './auth/authSagas';

export default function* rootSaga() {
    yield all([
        call(setAlert),
        call(register),
        call(loadUser),
        call(loginUser)
    ]);
}