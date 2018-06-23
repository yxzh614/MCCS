<template>
  <div class="main">
    <div>
      <button @click="login">登录</button>
      <button @click="cancel">取消</button>
    </div>
    <div>
      <input v-model="password" type="password" placeholder="密码">
    </div>
    <div>
      <input v-model="username" type="text" placeholder="账号">
    </div>
    <div class="hint">
      请输入账号和密码
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      username: 'asdmin',
      password: ''
    }
  },
  methods: {
    login () {
      this.$emit('vanish', this.username)
    },
    cancel () {
      this.$emit('vanish', false)
    }
  }
}
</script>

<style scoped>
.main {
  display: flex;
  flex-flow: column-reverse nowrap;
  justify-content: space-around;
  background: white;
  z-index: 999;
  position: fixed;
  top: 35vh;
  height: 30vh;
  left: 35vw;
  width: 31vw;
  text-align: center;
  border-radius: 2vh;
  box-shadow: 0 0 5vh black;
}
.hint {
  color: black;
}
input {
  width: 22vw;
  height: 3vh;
  border-radius: 1vh;
}
button {
  background: #3c3c3c;
  border-radius: 1vh;
  color: white;
  padding: 0;
  border: 0;
  margin: 0 5vw;
  width: 5vw;
  height: 4vh;
}
</style>
