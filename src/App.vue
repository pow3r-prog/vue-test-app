<template>
  <AppMain />
  <AppFooter />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AppMain from './components/AppMain.vue'
import AppFooter from './components/AppFooter.vue'

export default defineComponent({
  name: 'App',
  components: {
    AppMain,
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
