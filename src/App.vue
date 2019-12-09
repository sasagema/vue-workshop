<template>
  <div id="app">
    <movies/>
  </div>
</template>

<script>
import Movies from './containers/Movies.vue'


export default {
  name: 'app',
  components: {
    Movies
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: black;
  margin-top: 60px;
}
</style>
