export const MAIN = {
    ActionSaveUser: (user) => ({type: USER_SAVE, payload: user}),
    AsyncSaveUserSuccess: (user) => ({type:USER_SAVE_SUCCESS, payload: user}),
    ActionIdentityFound: (user) => ({type:IDENTITY_FOUND, payload:user}),
    AsyncApplicationStart: () => ({type:APPLICATION_START}),

    AsyncStartMQTT: () => ({type:MQTT_TRY_CONNECT}),

    AsyncFetchSessions: () => ({type: SAGA_FETCH_DATA}),

    AsyncSubscribeTopic: (topic) => ({type: SAGA_MESSAGE_SUB, payload: topic}),
    AsyncFetchMessages: (topic) => ({type: SAGA_MESSAGE_FETCH, payload: topic}),
    AsyncSendMessage: (model) => ({type: SAGA_MESSAGE_SEND, payload: model}),
    
    ActionMQTTUpdate: (model) => ({type:MESSAGE_RECEIVED, payload: model}),
    ActionHandleError: () => ({type:HANDLE_ERROR})
}

export const CHECK_CONNECTION = "CHECK_CONNECTION";

export const APPLICATION_START = "ASYNC_APPLICATION_START";
export const HANDLE_ERROR = "HANDLE_ERROR";

/* IDENTITY TYPES */
export const IDENTITY_FOUND = "USER_IDENTITY_FOUND";
export const USER_SAVE = "ASYNC_SAVE_USER";
export const USER_SAVE_SUCCESS = "ASYNC_SAVE_USER";

/* SAGA SERVICE */
export const SAGA_FETCH_DATA = "SAGA_FETCH_DATA";
export const SAGA_FETCH_START = "SAGA_FETCH_START";
export const SAGA_FETCH_SUCCESS = "SAGA_FETCH_SUCCESS";
export const SAGA_FETCH_FAILED = "SAGA_FETCH_FAILED";

export const SAGA_MESSAGE_SUB = "SAGA_MESSAGE_SUB";
export const SAGA_MESSAGE_FETCH = "SAGA_MESSAGE_FETCH";
export const SAGA_MESSAGE_SEND = "SAGA_MESSAGE_SEND";
export const MESSAGE_RECEIVED = "MESSAGE_RECEIVED";

/* MQTT CONNECTION */
export const MQTT_TRY_CONNECT = "MQTT_CONNECT";
export const MQTT_CONNECT_SUCCESS = "MQTT_CONNECT_SUCCESS";

export const MQTT_JSON_RECEIVED = "MQTT_JSON_RECEIVED";

export const MQTT_REQUEST_FAILED = "MQTT_REQUEST_FAILED";