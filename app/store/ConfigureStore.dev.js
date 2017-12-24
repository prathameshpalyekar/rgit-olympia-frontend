import { createStore, applyMiddleware, compose } from 'redux';
import Immutable from 'immutable';
import { Iterable } from 'immutable';
import { persistState } from 'redux-devtools';
import thunk from 'redux-thunk';

import rootReducer from '../reducers';
import DevTools from '../components/DevTools';

const enhancer = compose(
    applyMiddleware(thunk),
    DevTools.instrument(),
    persistState(
        window.location.href.match(
            /[?&]debug_session=([^&#]+)\b/
        )
    )
);

module.exports = function configureStore(initialState) {
    const store = createStore(rootReducer, initialState, enhancer);
    return store;
}
