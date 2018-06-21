<template>
  <div class="main">
    <div class="left">
      <div class="lunbo">
        <img class="lunbo" src="../../assets/logo.png" alt="">
      </div>
      <div class="btn" @click="goControl">
        <img src="../../assets/control.png" alt="">
        <div>控制台</div>
      </div>
      <div class="btn">
        <img src="../../assets/talk.png" alt="">
        <div>论坛</div>
      </div>
    </div>
    <div class="right">
      <div>
        <t-calendar></t-calendar>
      </div>
      <div>
        <iframe src="weather.html"></iframe>
      </div>
    </div>
  </div>
</template>

<script>
import TCalendar from '@/components/Tcalander'
export default {
  name: 'asd',
  methods: {
    goControl () {
      this.$router.push({path: '/control'})
    }
  },
  components: {
    TCalendar
  }
}
</script>

<style scoped>
div {
  text-align: center;
}
.main {
  display: flex;
  justify-content: space-between;
}
.left {
  background: #ffffff;
  width: 70vw;
  height: 60vh;
}
.lunbo {
  height: 25vh;
  background: white;
  margin-bottom: 4vh;
}
.lunbo > img {
  width: 55vw;
}
.btn {
  box-sizing: border-box;
  padding-top: 2vw;
  position: relative;
  width: 27vh;
  height: 27vh;
  display: inline-block;
  background: #ffffff;
  border-radius: 1vh;
  box-shadow: 0 0 4vh #949494;
  margin: 0 5vw;
}
.btn > div {
  position: absolute;
  bottom: 0;
  width: 100%;
  font-size: 2vh;
  height: 4vh;
  line-height: 4vh;
  background: #808080;
  color: white;
  border-bottom-left-radius: 1vh;
  border-bottom-right-radius: 1vh;
}
.btn > img {
  width: 15vh;
  height: 15vh;
}
.right {
  width: 26vw;
  margin: 0 3vw;
}
.right > div:first-child {
  height: 35vh;
  padding-top: 1vh;
  margin-bottom: 4vh;
}
.right > div {
  background: #ffffff;
  height: 20vh;
  border-radius: 1vh;
}
</style>
