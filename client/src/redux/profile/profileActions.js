import { GET_CURRENT_PROFILE_START, CLEAR_PROFILE, CREATE_OR_UPDATE_PROFILE_START, ADD_EXPERIENCE_START, ADD_EDUCATION_START } from './profileTypes';

export const getCurrentProfileAction = () => ({
    type: GET_CURRENT_PROFILE_START
});

export const clearProfile = () => ({
    type: CLEAR_PROFILE
});

export const createOrUpdateProfileAction = (formData, history, dispatch, edit ) => ({
    type: CREATE_OR_UPDATE_PROFILE_START,
    payload: { formData, edit, history, dispatch }
});

export const addExperienceAction = (formData, history, dispatch) => ({
    type: ADD_EXPERIENCE_START,
    payload: { formData, history, dispatch }
});

export const addEducationAction = (formData, history, dispatch) => ({
    type: ADD_EDUCATION_START,
    payload: { formData, history, dispatch }
});