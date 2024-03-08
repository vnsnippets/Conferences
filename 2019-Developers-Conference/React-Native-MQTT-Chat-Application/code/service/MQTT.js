import { Client, Message } from 'react-native-paho-mqtt';
import { LocalSettings } from '../constants/Settings';
import { ActionStartMQTT, ActionMQTTConnected, ActionMQTTUpdate, ActionMQTTRequestFailed } from '../reducers/main';
import * as ACTIONS from '../reducers/Actions';
import { Guid } from 'guid-typescript';
// import Store from '../reducers/Store';

TRIALS = 0;

const STATUS = {
    Connected: "STATUS_CONNECTED",
    ConnectionLost: "connectionLost",
    MessageReceived: "messageReceived"
};

const COMMANDS = {
    Fetch: {
        Command: "REQ_UPDATES"
    }
};

//IN-MEMORY LOCAL STORAGE
const Storage = {
    setItem: (key, item) => {
        Storage[key] = item;
    },
    getItem: (key) => Storage[key],
    removeItem: (key) => {
        delete Storage[key];
    },
};

export default class MQTT {
    static Store = null;
    static CLIENT = new Client({ uri: LocalSettings.Broker, clientId: Guid.create().toString(), storage: Storage });
    static PENDING_RESPONSE = false;

    static Initialize = (Store) => {
        this.Store = Store;
        
        // set event handlers
        this.CLIENT.on(STATUS.ConnectionLost, (error) => {
            console.log("[MQTT] Connection Lost.");

            if (error.errorCode !== 0) {
                console.log(error);
            }

            this.Store.dispatch(ACTIONS.MAIN.AsyncStartMQTT());
        });

        this.CLIENT.on(STATUS.MessageReceived, (message) => {
            this.PENDING_RESPONSE = false;

            try {
                if (message && message.payloadString != "") {
                    console.log("[MQTT] Received: " + message.payloadString);
                    model = JSON.parse(message.payloadString);
                    this.Store.dispatch(ACTIONS.MAIN.ActionMQTTUpdate(model));
                }
            } catch (e) {
                console.log("[MQTT] Receive Error");
                console.log(e);
            }
        });
    }

    static Start = () => {
        // Connect the client

        this.CLIENT.connect()
            .then(() => {
                // Once a connection has been made, make a subscription and send a message.
                console.log('[MQTT] Connected.');

                TRIALS = 0;
                this.CheckConnectivity();
                return this.CLIENT.subscribe(LocalSettings.Subscribe);
            })
            .then(() => {
                this.Store.dispatch(ActionMQTTConnected());
            })
            .catch((error) => {
                TRIALS++;
                if (error.errorCode !== 0) {
                    console.log('[MQTT] Connection Broken - ' + error);
                    console.log('[MQTT] Retry: ' + TRIALS);
                }

                this.CLIENT.disconnect();
                this.Start();
            });
    
    };

    static SendMessage = (destination, model) => {
        try {
            const payload = JSON.stringify(model);
            const message = new Message(payload);
            message.destinationName = LocalSettings.Publish;

            this.CLIENT.send(message);

            console.log("[MQTT] Message sent - " + payload);
        } catch (e) {
            this.Store.dispatch(ActionMQTTRequestFailed()); 
            this.CLIENT.disconnect();
            // this.Store.dispatch(AsyncStartMQTT());
            this.Start();
        }
    }

    static CheckConnectivity = () => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    if (!this.PENDING_RESPONSE) {
                        console.log("[MQTT] Checking connectivity.")
                        this.SendMessage(LocalSettings.Subscribe, "");

                        this.PENDING_RESPONSE = true;
                    } else {
                        console.log("[MQTT] Client disconnected.")
                        this.CLIENT.disconnect();
                        this.Store.dispatch(ACTIONS.MAIN.AsyncStartMQTT());
                    }
                } catch(e) {
                    this.Store.dispatch(ACTIONS.MAIN.AsyncStartMQTT());
                }
                
                this.CheckConnectivity();
            }, 5000)
        })
    }
}