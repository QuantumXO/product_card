'use strict';

import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';


export const history = createBrowserHistory();
import rootReducer from './../reducers/rootReducer';

const logger = createLogger();

export default function configureStore(preloadedState) {

    const store = createStore(
        rootReducer(history),
        preloadedState,
        compose(
            composeWithDevTools(
                applyMiddleware(
                    thunk, logger, routerMiddleware(history), // for dispatching history actions
                )
            )

        )
    );

    return store;
}
