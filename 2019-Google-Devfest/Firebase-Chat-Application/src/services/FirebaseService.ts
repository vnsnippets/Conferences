import store from '@/store';
import { db } from '@/firebase';
import moment from 'moment';

export const Collections = {
  UsernameDB : db.collection('username'),
  MessagesDB : db.collection('messages')
}

export const SetUsername = (value : string) => {
  Collections.UsernameDB.add({ username: value })
    .then((record) => {
      console.log("Document written with ID: ", record.id);
      store.dispatch('SetUsernameAsync', value);
    })
    .catch((error) => console.error("Error adding document: ", error));
}

export const SendMessage = (payload : any) => {
  Collections.MessagesDB.add({
    author: payload.author,
    createdAt: Date.now(),
    message: payload.message
  })
  .then((record) => console.log("Message added with ID: ", record.id))
  .catch((error) => console.log("Error adding message: ", error));
}

export function FetchMessages() {
    return Collections.MessagesDB.orderBy('createdAt');    
}