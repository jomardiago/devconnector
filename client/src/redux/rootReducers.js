import { combineReducers } from 'redux';

import alert from './alert/alertReducer';
import auth from './auth/authReducer';
import profile from './profile/profileReducer';

export default combineReducers({
    alert,
    auth,
    profile
});