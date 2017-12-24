import axios from 'axios';
import Config from '../../../config';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

function requestLogout() {
    return {
        type: LOGOUT_REQUEST,
    };
}

function receiveLogout() {
    return {
        type: LOGOUT_SUCCESS,
    };
}

export function logoutUser() {
    return dispatch => {
        dispatch(requestLogout())
        return axios({
            url: Config.BASE_URL + 'logout',
            method: 'post',
            responseType: 'json'
        }).then(function (response) {
            dispatch(receiveLogout())
        }).catch(function (response) {
            dispatch(receiveLogout())
        });
    }
}
