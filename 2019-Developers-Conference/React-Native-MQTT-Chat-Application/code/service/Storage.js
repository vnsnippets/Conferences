/**
 * Author: Vidush H. Namah
 * Date: 29.03.2019
 * 
 * Storage.js : Service to interact with persisted storage
 */

import { AsyncStorage } from 'react-native';

export const KEYS = {
    AUTH_DATA: "@CHATTON:IDENTITY"
}

export const StoreDataAsync = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, value);
    } catch (error) {
        console.log("[STORAGE] Failed to store data.");
        console.log(error);
    }
};

export const RetrieveDataAsync = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
            // console.log("[STORAGE] Found data with KEY:" + key + ".");
            // console.log(value);

            return value;
        }
    } catch (error) {
        console.log("[STORAGE] Failed to store data.");
        console.log(error);
    }

    return null;
};

export const PurgeDataAsync = async (key) => {
    try {
        await AsyncStorage.removeItem(key);
        console.log("[STORAGE] Item at KEY:" + key + " removed.");
        
    } catch (error) {
        console.log("[STORAGE] Failed to remove data.");
        console.log(error);
    }
}