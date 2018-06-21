<template>
  <div id="app">
    <login-form></login-form>
    <router-view/>
  </div>
</template>

<script>
import btnList from '@/components/btnList'
import roomList from '@/components/roomList'
import loginForm from '@/components/loginForm'
export default {
  name: 'App',
  components: {
    btnList,
    roomList,
    loginForm
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
