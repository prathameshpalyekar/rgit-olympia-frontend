import Immutable from 'immutable';
import { LOGIN_REQUEST, LOGIN_FAILURE, LOGIN_SUCCESS } from '../actions/login.js';
import { LOGOUT_REQUEST, LOGOUT_SUCCESS } from '../actions/logout.js';

function getUser() {
    const { __shortlist_user } = window;

    if (!__shortlist_user || typeof __shortlist_user !== 'object' || !__shortlist_user.email) {
        return false;
    }

    const user = Object.assign({}, __shortlist_user);
    return user;
}

const auth = (state = Immutable.fromJS({
    isFetching: false,
    isAuthenticated: !!getUser(),
    user: getUser()
}), action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return state.merge({
                isFetching: true,
                isAuthenticated: false,
                errorMessage: '',
                user: action.creds
            });
        case LOGIN_SUCCESS:
            return state.merge({
                isFetching: false,
                isAuthenticated: true,
                errorMessage: '',
                user: action.user
            });
        case LOGIN_FAILURE:
            return state.merge({
                isFetching: false,
                isAuthenticated: false,
                errorMessage: action.message,
                user: null
            });
        case LOGOUT_REQUEST:
            return state.merge({
                isFetching: true
            });
        case LOGOUT_SUCCESS:
            return state.merge({
                isFetching: false,
                isAuthenticated: false,
                user: null,
                errorMessage: ''
            });

        default:
            return state
    }
}

module.exports = auth;
