<template>
  <div id="app">
    <room-list></room-list>
    <router-view/>
    <btn-list></btn-list>
  </div>
</template>

<script>
import btnList from '@/components/btnList'
import roomList from '@/components/roomList'
export default {
  name: 'App',
  components: {
    btnList,
    roomList
  }
}
</script>

<style>
body {
  margin: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background: #828282;
  padding: 2vw;
  box-sizing: border-box;
  height: 100vh;
}
</style>
