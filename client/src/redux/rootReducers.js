import { combineReducers } from 'redux';

import alert from './alert/alertReducer';
import auth from './auth/authReducer';
import profile from './profile/profileReducer';
import post from './post/postReducers';

export default combineReducers({
    alert,
    auth,
    profile,
    post
});