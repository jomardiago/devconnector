import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';

import rootReducers from './redux/rootReducers';
import rootSagas from './redux/rootSagas';

const initialState = {};
const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware, logger];
const store = createStore(
    rootReducers, 
    initialState,
    composeWithDevTools(applyMiddleware(...middleware)) 
);

sagaMiddleware.run(rootSagas);

export default store;