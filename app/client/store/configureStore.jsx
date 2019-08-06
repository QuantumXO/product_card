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


export default function configureStore(preloadedState) {

    const persistedState = loadLocalStorageState();
    const middlewares = [thunk, routerMiddleware(history)];

    if(process.env.NODE_ENV != 'production'){
        const logger = createLogger();
        middlewares.push(logger)
    }

    const store = createStore(
        rootReducer(history),
        persistedState,
        //compose(
            composeWithDevTools(
                applyMiddleware(...middlewares)
            )

        //)
    );

    if(!loadLocalStorageState()){
        saveLocalStorageState(store.getState());
    }

    store.subscribe(() => {
        saveLocalStorageState(store.getState())
    });

    return store;
}
