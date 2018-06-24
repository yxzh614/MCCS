<template>
  <div class="main">
    <div v-if="!loged" @click="sign">注册</div>
    <div v-if="!loged" @click="showLogin = true">登录</div>
    <div v-if="loged" @click="quit">退出</div>
    <div v-if="loged">{{username}}</div>
    <img class="logo" src="../assets/logo.png" alt="">
    <div class="go-home" style="width: 4em;" @click="$route.path !== '/' ? $router.push({path: '/'}) : _ => {}">
      <img v-if="$route.path !== '/'" src="../assets/home.png" alt="">
    </div>
    <div class="empty"></div>
    <div>菌棚智能控制系统</div>
    <div class="strong">蘑云</div>
    <img class="logo" src="../assets/logo.png" alt="">
    <login-model v-if="showLogin" @vanish="login"></login-model>
  </div>
</template>

<script>
import loginModel from '@/components/loginModel'
export default {
  data () {
    return {
      showLogin: false,
      loged: false
    }
  },
  methods: {
    login (e) {
      console.log(e)
      if (e) {
        this.showLogin = false
        console.log(e)
        this.loged = true
        this.username = e
        this.$emit('login', this.loged)
      } else {
        this.showLogin = false
        this.$emit('login', this.loged)
      }
    },
    sign () {
      alert('请联系管理员。')
    },
    quit () {
      this.loged = false
      this.$emit('login', this.loged)
      this.loged = false
      this.$router.push({name: 'index'})
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
.go-home {
  height: 5vh;
  width: 6vw;
}
.go-home > img {
  height: 6vh;
  width: 7vw;
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
.logo {
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
