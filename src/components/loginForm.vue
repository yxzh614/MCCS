<template>
  <div class="main">
    <div>注册</div>
    <div @click="showLogin = true">登录</div>
    <img src="../assets/logo.png" alt="">
    <div style="width: 4em;" @click="$route.path !== '/' ? $router.push({path: '/'}) : _ => {}">{{$route.path !== '/' ? '返回首页' : ''}}</div>
    <div class="empty"></div>
    <div>菌棚智能控制系统</div>
    <div class="strong">蘑云</div>
    <img src="../assets/logo.png" alt="">
    <login-model v-if="showLogin" @vanish="showLogin = false"></login-model>
  </div>
</template>

<script>
import loginModel from '@/components/loginModel'
export default {
  data () {
    return {
      username: '',
      password: '',
      showLogin: false
    }
  },
  methods: {
    login () {
      this.$emit('login')
    }
  },
  components: {
    loginModel
  }
}
</script>

<style scoped>
.main {
  width: 100vw;
  background: #3c3c3c;
  align-items: center;
  height: 6vh;
  display: flex;
  flex-flow: row-reverse nowrap;
  justify-content: space-between;
  margin: -2vw -2vw 4vh -2vw;
  color: white;
}
.main > * {
  flex-grow: 1;
}
.main > img {
  flex-grow: 0;
  margin: 0 1vw;
}
.empty {
  flex-grow: 20;
}
img {
  width: 4vh;
  height: 4vh;
}
.strong {
  font-size: 2em;
}
div::after {
  clear: both;
}
</style>
