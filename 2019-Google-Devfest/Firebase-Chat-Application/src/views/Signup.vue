<template>
  <div class="cs-container">
    <div>
      <h4 class="text-white mb-4">PROJECT CHATTONS</h4>
      <b-img src="../assets/logo.png" fluid alt="Logo" class="cs-logo"></b-img>
      
      <div class="group mt-3 text-white">      
        <input type="text" required v-model="username">
        <span class="highlight"></span>
        <span class="bar"></span>
        <label>Name</label>
      </div>
      
      <b-button @click.prevent="signIn()" variant="primary">JOIN CHATROOM</b-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue';

import { SetUsername, FetchMessages } from '@/services/FirebaseService';

@Component({
  components: {
    HelloWorld,
  },
})
export default class Signup extends Vue {
  username: string = this.$store.state.username;
  bindTest: any = null;

  signIn() {
    SetUsername(this.username);
    console.log(this.bindTest);
    this.$router.push('room');
  };

  created() {
    this.$bind('bindTest', FetchMessages());
    console.log(this.bindTest);
    if (this.username) {
      this.$router.push('room')
    }
  };
}
</script>

<style scoped>
  .cs-logo{
      height: 124px;
  }

  .cs-container {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    height: 100%
  }
  .group { 
    position:relative; 
    margin-bottom:45px; 
  }
  input {
    font-size:18px;
    padding:10px 10px 10px 5px;
    display:block;
    width:300px;
    border:none;
    border-bottom:1px solid #757575;
    background-color:transparent;
    color: white;
  }
  input:focus { outline:none; }


  label {
    color:#999; 
    font-size:18px;
    font-weight:normal;
    position:absolute;
    pointer-events:none;
    left:5px;
    top:10px;
    transition:0.2s ease all; 
    -moz-transition:0.2s ease all; 
    -webkit-transition:0.2s ease all;
  }


  input:focus ~ label, input:valid ~ label {
    top:-20px;
    font-size:14px;
    color:#efc84a;
  }


  .bar 	{ position:relative; display:block; width:300px; }
  .bar:before, .bar:after 	{
    content:'';
    height:2px; 
    width:0;
    bottom:1px; 
    position:absolute;
    background:#efc84a; 
    transition:0.2s ease all; 
    -moz-transition:0.2s ease all; 
    -webkit-transition:0.2s ease all;
  }
  .bar:before {
    left:50%;
  }
  .bar:after {
    right:50%; 
  }


  input:focus ~ .bar:before, input:focus ~ .bar:after {
    width:50%;
  }

  .highlight {
    position:absolute;
    height:60%; 
    width:100px; 
    top:25%; 
    left:0;
    pointer-events:none;
    opacity:0.5;
  }


  input:focus ~ .highlight {
    -webkit-animation:inputHighlighter 0.3s ease;
    -moz-animation:inputHighlighter 0.3s ease;
    animation:inputHighlighter 0.3s ease;
  }

  @-webkit-keyframes inputHighlighter {
    from { background:#5264AE; }
    to 	{ width:0; background:transparent; }
  }
  @-moz-keyframes inputHighlighter {
    from { background:#5264AE; }
    to 	{ width:0; background:transparent; }
  }
  @keyframes inputHighlighter {
    from { background:#5264AE; }
    to 	{ width:0; background:transparent; }
  }
</style>