/**
 * Author: Vidush H. Namah (2019)
 * 
 * Reducer for Main Screen
 */
import * as ACTIONS from '../Actions';

const INITIAL = {
    Sessions: [],
    Messages: [],
    Identity: null,
    Loading: false,
    Connected: false,
    Error: null,
    Refresh: false
};

export const AsyncConnectMQTT = () => ({
    type: ACTIONS.MQTT_TRY_CONNECT
});

export const ActionMQTTConnected = () => ({
    type: ACTIONS.MQTT_CONNECT_SUCCESS
});

export const ActionMQTTUpdate = (payload) => ({
    type: ACTIONS.MQTT_JSON_RECEIVED,
    payload: payload
});

export const ActionMQTTRequestFailed = () => ({
    type: ACTIONS.MQTT_REQUEST_FAILED
});

export default MainStateReducer = (state = INITIAL, action = {}) => {
    switch (action.type) {
        case ACTIONS.HANDLE_ERROR:
            return {
                ...state,
                Error: null
            }
            
        case ACTIONS.MESSAGE_RECEIVED:
            return {
                ...state,
                Messages: [...state.Messages, action.payload],
                Refresh: !state.Refresh
            }

        case ACTIONS.IDENTITY_FOUND:
            console.log("[REDUCER] Identity found.");
            return {
                ...state,
                Identity: action.payload
            }

        case ACTIONS.USER_SAVE_SUCCESS:
            console.log(action);
            return {
                ...state,
                Identity: action.payload
            }

        case ACTIONS.MQTT_CONNECT_SUCCESS:
            console.log("[REDUCER] MQTT Connected.");
            return {
                ...state,
                Connected: true,
                Error: null
            };

        case ACTIONS.SAGA_FETCH_START:
            console.log("[REDUCER] Fetch Saga Started.")
            return {
                ...state,
                Error: null,
                Loading: true
            };

        case ACTIONS.SAGA_FETCH_SUCCESS:
            console.log("[REDUCER] Fetch Saga Success.");
            return {
                ...state,
                Sessions: action.payload,
                Loading: false,
                Error: null
            };

        case ACTIONS.SAGA_FETCH_FAILED:
            console.log("[REDUCER] Fetch Saga Failed");
            return {
                ...state,
                Loading: false,
                Error: {
                    Title: "OOPS..WHAT HAPPENED?",
                    Message: "Failed to connect to messaging hub."
                }
            };

        case ACTIONS.MQTT_JSON_RECEIVED:
            console.log("[REDUCER] Received MQTT updates");
            return {
                ...state,
                Loading: false,
                Data: action.payload,
                Error: null
            };

        case ACTIONS.MQTT_REQUEST_FAILED:
            console.log("[REDUCER] Failed to send MQTT Command.")
            return {
                ...state,
                Loading: false,
                Error: {
                    Title: "Network Error",
                    Message: "Failed to connect to messaging hub."
                }
            };

        default:
            return state;
    }
}