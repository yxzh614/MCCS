<template>
  <div>
    <img src="../assets/logo.png" alt="">
  </div>
</template>

<script>
export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    login () {
      this.$emit('login')
    }
  }
}
</script>

<style scoped>
div {
  height: 6vh;
}
img {
  float: right;
  width: 4vh;
  height: 4vh;
}
div::after {
  clear: both;
}
</style>
