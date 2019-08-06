'use strict';

import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { loadLocalStorageState, saveLocalStorageState } from './../helpers/localStorageState';

export const history = createBrowserHistory();
import rootReducer from './../reducers/rootReducer';

const persistedState = loadLocalStorageState();
const logger = createLogger();

export default function configureStore(preloadedState) {

    const store = createStore(
        rootReducer(history),
        persistedState,
        compose(
            composeWithDevTools(
                applyMiddleware(
                    thunk, logger, routerMiddleware(history), // for dispatching history actions
                )
            )

        )
    );

    store.subscribe(() => {
        saveLocalStorageState(store.getState())
    });

    return store;
}
