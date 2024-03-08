/**
 * Author: Vidush H. Namah (2019)
 * 
 * Connects Reducer to the application Store
 * Note: Consider use of AsyncStorage for persistance
 */

import { createStore, applyMiddleware } from 'redux';
import Reducer from './Reducer';

import createSagaMiddleware from 'redux-saga';
import DefaultSaga from './Saga';

const SAGA = createSagaMiddleware();

const Store = createStore(Reducer, applyMiddleware(SAGA));
SAGA.run(DefaultSaga);
    
export default Store;