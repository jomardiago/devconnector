import { GET_CURRENT_PROFILE_START, CLEAR_PROFILE } from './profileTypes';

export const getCurrentProfileAction = () => ({
    type: GET_CURRENT_PROFILE_START
});

export const clearProfile = () => ({
    type: CLEAR_PROFILE
});