<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/photologo.png">
    <h1 class="display-1" style="float:right;,
    font-family: 'Bebas Neue Bold', Helvetica, Arial, sans-serif;">BJM Photography</h1>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '../components/HelloWorld.vue'; // @ is an alias to /src

@Component({
  components: {
    HelloWorld,
  },
})
export default class HomeView extends Vue {}
</script>
