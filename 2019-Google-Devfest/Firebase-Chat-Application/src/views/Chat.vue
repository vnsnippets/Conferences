<template>
<div class="container">
    <h5 class="cs-header">CHATROOM</h5>

    <div class="cs-messages">
        <chat-bubble v-for="(data, index) in MessageInbox" v-bind:key="index" :payload="data"></chat-bubble>
    </div>

    <div class="message-input">
        <input type="text" @keyup.enter="OnClickSend()" placeholder="Type a message" v-model="message" />
        <button @click.prevent="OnClickSend()" class="btn-send" type="button">SEND</button>
    </div>
</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ChatBubble from '@/components/ChatBubble.vue';
import { FetchMessages, SendMessage } from '@/services/FirebaseService';

@Component({
  components: {
    ChatBubble,
  },
})
export default class Chat extends Vue {
    
    user: string = this.$store.state.username;
    message: string = "";
    inbox = [];

    get MessageInbox() {
        return this.inbox;
    }

    created() {
        this.$bind('inbox', FetchMessages());
    }

    updated() {
        //this.scrollTop = this.scrollHeight;
    }
        
    OnClickSend() {
        SendMessage({
            author: this.$store.state.username,
            message: this.message
        });
        this.message = "";
    }
}
</script>

<style scoped>
.message-input {
  position: fixed;
  bottom: 0;
  width: 100%;
  background: #373f3d;
  border-top: 1px #efc84a solid;
}

.message-input input {
  background: rgba(0, 0, 0, 0) none repeat scroll 0 0;
  border: medium none;
  color: #eee;
  font-size: 1em;
  min-height: 48px;
  width: 100%;
  padding-left: 1em;
  padding-right: 1em;
  text-align: left;
}

.message-input input::placeholder {
    color: #bbb;
}

.message-input .btn-send {
    background: #efc84a none repeat scroll 0 0;
    border: medium none;
    padding: 0.5em 1em;
    color: #05072b;
    cursor: pointer;
    font-size: 0.9em;
    position: absolute;
    right: 0;
    min-height: 48px;
}

.cs-header {
    text-align: center;
    color: white;
    position: fixed;
    top: 0;
    width: 100%;
    padding: 1em;
    background: #373f3d;
}

.cs-messages {
    padding: 4em 1em;
}

@media screen and (min-width: 768px) {
    .cs-messages {
        padding: 4em 0em;
        width: 50%;
        margin: auto;
    }
}

.container{
    margin: 0;
    padding: 0;
    min-width: 100%;
    height: 100%;
}
/* 
img{ max-width:100%;}

.inbox_msg {
    clear: both;
    overflow: hidden;
}

.incoming_msg_img {
  display: inline-block;
  width: 6%;
}
.received_msg {
  display: inline-block;
  padding: 0 0 0 10px;
  vertical-align: top;
  width: 92%;
 }
 .received_withd_msg p {
  background: #ebebeb none repeat scroll 0 0;
  border-radius: 3px;
  color: #646464;
  font-size: 14px;
  margin: 0;
  padding: 5px 10px 5px 12px;
  width: 100%;
}
.time_date {
  color: #747474;
  display: block;
  font-size: 12px;
  margin: 8px 0 0;
}
.received_withd_msg { width: 57%;}


 .sent_msg p {
  background: #05728f none repeat scroll 0 0;
  border-radius: 3px;
  font-size: 14px;
  margin: 0; color:#fff;
  padding: 5px 10px 5px 12px;
  width:100%;
}
.outgoing_msg{ overflow:hidden; margin:26px 0 26px;}
.sent_msg {
  float: right;
  width: 46%;
}

    .type_msg {
        border-top: 1px solid #c4c4c4;
        position: relative;
    }

    .msg_send_btn {
        background: #05728f none repeat scroll 0 0;
        border: medium none;
        border-radius: 50%;
        color: #fff;
        cursor: pointer;
        font-size: 17px;
        height: 33px;
        position: absolute;
        right: 0;
        top: 11px;
        width: 33px;
    }


    .msg_history {
        height: 516px;
        overflow-y: auto;
    } */
</style>