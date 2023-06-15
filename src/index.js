import React from 'react';
import ReactDOM from 'react-dom/client';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import {takeLatest, put } from 'redux-saga/effects';
import axios from 'axios';
import App from './App';


const plantList = (state = [], action) => {
  switch (action.type) {
    case 'ADD_PLANTS':
      return action.payload
    default:
      return state;
  }
};

const sagaMiddleware = createSagaMiddleware();

function* rootSaga() {
    yield takeLatest("GET_PLANTS", getPlants);
    yield takeLatest("POST_PLANTS", postPlants);
    yield takeLatest("DELETE", deletePlants);
}

function* getPlants() {
    try {
        const plantResponse = yield axios.get('/api/plant');
        yield put({type: "ADD_PLANTS", payload: plantResponse.data});
    }catch (error) {
        console.log('error getting plants', error);
    }
}

function* postPlants(action){
    try {
        yield axios.post('/api/plant', action.payload);
        yield put({ type: "GET_PLANTS"});
    }catch (error) {
        console.log('error posting plant', error);
    }
}

function* deletePlants(action) {
    try{
        yield axios.delete(`/api/plant/${action.payload}`)
        yield put({ type: "GET_PLANTS"});
    }catch (error) {
        console.log("error deleting plant", error);
    }


}

const store = createStore(
  combineReducers({ plantList }),
  applyMiddleware(sagaMiddleware, logger),
);

sagaMiddleware.run(rootSaga);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
