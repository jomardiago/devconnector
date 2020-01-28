import { 
    GET_CURRENT_PROFILE_START, 
    CLEAR_PROFILE, 
    CREATE_OR_UPDATE_PROFILE_START, 
    ADD_EXPERIENCE_START, 
    ADD_EDUCATION_START, 
    DELETE_EXPERIENCE_START,
    DELETE_EDUCATION_START,
    DELETE_ACCOUNT_START,
    GET_ALL_PROFILES_START,
    GET_PROFILE_BY_ID_START,
    GET_GITHUB_REPOS_START
} from './profileTypes';

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

export const deleteExperienceAction = (id, dispatch) => ({
    type: DELETE_EXPERIENCE_START,
    payload: { id, dispatch }
});

export const deleteEducationAction = (id, dispatch) => ({
    type: DELETE_EDUCATION_START,
    payload: { id, dispatch }
});

export const deleteAccountAction = (dispatch) => ({
    type: DELETE_ACCOUNT_START,
    payload: { dispatch }
});

export const getAllProfilesAction = () => ({
    type: GET_ALL_PROFILES_START
});

export const getProfileByIdAction = userId => ({
    type: GET_PROFILE_BY_ID_START,
    payload: userId
});

export const getGithubReposAction = username => ({
    type: GET_GITHUB_REPOS_START,
    payload: username
});