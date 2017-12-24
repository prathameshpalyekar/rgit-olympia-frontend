import axios from 'axios';
import Config from '../../../config';

// Possible states
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

function requestLogin(creds) {
    return {
        type: LOGIN_REQUEST,
        creds,
    };
}

function receiveLogin(user) {
    return {
        type: LOGIN_SUCCESS,
        user,
    };
}

function loginError(message) {
    return {
        type: LOGIN_FAILURE,
        message,
    };
}

export function loginUser(creds) {
    return (dispatch) => {
        dispatch(requestLogin(creds));
        return axios({
            url: Config.BASE_URL + 'admin/login',
            method: 'post',
            responseType: 'json',
            data: creds
        }).then((xhrResponse) => {
            const response = xhrResponse.data;
            dispatch(receiveLogin(response.data));
        }).catch(xhrResponse => {
            const response = xhrResponse.data;
            dispatch(loginError(response.message || 'Incorrect Username or password.'));
        });
    }
}
