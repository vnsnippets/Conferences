<template>
    <div class="bubble-wrap">
        <div v-bind:class="(IsIncoming) ? 'incoming' : 'outgoing'">
            <div class="bubble">
                <span class="time">{{FormattedDateTime}} - {{payload.author}}</span>
                <p>{{payload.message}}</p>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import moment from 'moment';

@Component
export default class HelloWorld extends Vue {
    @Prop()
    public payload! : any
    
    get IsIncoming() {
        return this.payload.author != this.$store.state.username;
    }

    get FormattedDateTime() {
        var value = new Date(this.payload.createdAt);
        return moment(value).format('DD-MM-YYYY HH:mm');
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.incoming p {    
    background: #ebebeb none repeat scroll 0 0;
    text-align: left;
    color: #252525;
}

.incoming .time {
    text-align: left;
    margin-left: 0.5em;
}

.outgoing p {    
    background: #efc84a none repeat scroll 0 0;
    text-align: right;
    margin-left: auto;
    color: #252525;
}

.outgoing .time {
    text-align: right;
    margin-right: 0.5em;
}

.bubble p {
    border-radius: 3px;
    font-size: 0.9em;
    padding: 7.5px 10px 7.5px 10px;
    width: 80%;
}

.time {
  color: #ddd;
  display: block;
  font-size: 12px;
  margin: 8px 0 0;
  text-transform: uppercase;
}
/* 

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
.input_msg_write input {
  background: rgba(0, 0, 0, 0) none repeat scroll 0 0;
  border: medium none;
  color: #4c4c4c;
  font-size: 15px;
  min-height: 48px;
  width: 100%;
} */
</style>
