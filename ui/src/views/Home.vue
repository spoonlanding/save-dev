<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
    <button class="get" @click="handleClick">GET</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

@Component({
  components: {
    HelloWorld,
  },
  methods: {
    handleClick() {
      this.$store.dispatch({
        type: 'search',
        query: 'babel-jest'
      })
    }
  }
})
export default class Home extends Vue {}
</script>
