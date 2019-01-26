<template>
  <div class="home">
    <div>
      <input type="text" v-model="query">
      <button class="get" @click="handleClick">GET</button>
    </div>
    <h3
      v-if="pkg.isDefined"
      class="pkg-name">
      {{ pkg.name }} is a {{ pkg.type }} dependency
    </h3>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import { Package } from '../../../types';

export default{
  components: {
    HelloWorld,
  },
  data() {
    return {
      query: 'babel-jest'
    }
  },
  computed: {
    pkg() {
      const { name, isDev } = this.$store.state.pkg;
      return {
        name,
        type: isDev ? 'DEV' : 'PROD',
        isDefined: name !== '' && name !== undefined && isDev !== null
      }
    }
  },
  methods: {
    handleClick() {
      this.$store.dispatch({
        type: 'search',
        query: this.$data.query
      })
    }
  }
}
</script>

<style lang="scss">
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
