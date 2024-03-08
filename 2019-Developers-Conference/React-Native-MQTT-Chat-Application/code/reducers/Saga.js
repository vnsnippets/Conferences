/**
 * Author: Vidush H. Namah (2019)
 * 
 * Reducer for SONOFFS20 WIDGET
*/

import { delay, call, put, takeLatest, takeEvery } from 'redux-saga/effects';

import * as ACTIONS from './Actions';
import MQTT from '../service/MQTT';
import * as Storage from '../service/Storage';

import { Guid } from 'guid-typescript';

import { GetSessions } from '../service/Cloud';

function* CheckConnectivity() {
    try {
        yield call(MQTT.CheckConnectivity());
    } catch (e) {
        console.log(e);
    }
}

function* InitializeApplication() {
    try {
        // yield call(Storage.PurgeDataAsync, Storage.KEYS.AUTH_DATA)
        const Identity = yield call(Storage.RetrieveDataAsync, Storage.KEYS.AUTH_DATA);
        if (Identity) yield put(ACTIONS.MAIN.ActionIdentityFound(JSON.parse(Identity)));

        yield call(MQTT.Start);
        yield put(ACTIONS.MAIN.AsyncFetchSessions());
    } catch (e) {
        console.log("[SAGA] Failed to start MQTT.")
    }
}

function* AsyncStartMQTT() {
    try {
        console.log("[SAGA] Starting MQTT.");

        yield call(delay, 2500);

        yield call(MQTT.Start);
        yield put(ACTIONS.MAIN.AsyncFetchSessions());
    } catch (e) {
        console.log("[SAGA] Failed to start MQTT.")
    }
}

function* FetchUpdateHandler() {
    try {
        yield put({ type: ACTIONS.SAGA_FETCH_START });
        console.log("[SAGA] Fetching data.");

        const Sessions = yield call(GetSessions);
        yield put({ type: ACTIONS.SAGA_FETCH_SUCCESS, payload: Sessions });
    } catch (e) {
        yield put({ type: ACTIONS.SAGA_FETCH_FAILED });
    }
};

function* SaveUserIdentity(action) {
    console.log("[SAGA] Save user.")
    try {
        model = {
            Id: Guid.create().toString(),
            Name: action.payload.toUpperCase()
        }
        console.log(model);
        yield call(Storage.StoreDataAsync(Storage.KEYS.AUTH_DATA, JSON.stringify(model)));

        yield put(ACTIONS.MAIN.AsyncSaveUserSuccess(model));
    } catch (error) {
        console.log(error);
    }
}

function* AsyncLoadMessages(action) {
    topic = action.payload;

    // Send message via MQTT
}

function* AsyncSendMessage(action) {
    model = action.payload;
    yield call(MQTT.SendMessage, model.Topic, model);
}

function* AsyncSubscribeTopic(action) {
    topic = action.payload;
    yield call(MQTT.Subscribe, topic);
}

function* DefaultSaga() {
    console.log("[SAGA] Waiting.");
    yield takeLatest(ACTIONS.SAGA_FETCH_DATA, FetchUpdateHandler);
    yield takeLatest(ACTIONS.APPLICATION_START, InitializeApplication);
    yield takeLatest(ACTIONS.USER_SAVE, SaveUserIdentity);
    yield takeLatest(ACTIONS.MQTT_TRY_CONNECT, AsyncStartMQTT);
    yield takeLatest(ACTIONS.SAGA_MESSAGE_FETCH, AsyncLoadMessages);
    yield takeLatest(ACTIONS.SAGA_MESSAGE_SUB, AsyncSubscribeTopic);
    yield takeLatest(ACTIONS.SAGA_MESSAGE_SEND, AsyncSendMessage);
    yield takeLatest(ACTIONS.CHECK_CONNECTION, CheckConnectivity);
}

export default DefaultSaga;