<template>
  <HelloWorld />
  <AppFooter />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HelloWorld from './components/HelloWorld.vue'
import AppFooter from './components/AppFooter.vue'

export default defineComponent({
  name: 'App',
  components: {
    HelloWorld,
    AppFooter,
  },
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background: #212529;
}

html {
  background: #212529;
}
</style>
