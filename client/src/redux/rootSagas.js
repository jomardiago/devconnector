import { all, call } from 'redux-saga/effects';

import { setAlert } from './alert/alertSagas';
import { register } from './auth/authSagas';

export default function* rootSaga() {
    yield all([
        call(setAlert),
        call(register)
    ]);
}