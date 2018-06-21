<template>
  <div>
    <div class="left">
      <div class="lunbo">
        <img class="lunbo" src="../../assets/logo.png" alt="">
      </div>
      <div class="btn">
        <img src="../../assets/logo.png" alt="">
        <div>控制台</div>
      </div>
      <div class="btn">
        <img src="../../assets/logo.png" alt="">
        <div>控制台</div>
      </div>
    </div><div class="right">
      <div>cal</div>
      <div>wea</div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
div {
  text-align: center;
}
.left {
  display: inline-block;
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
  width: 20vw;
  height: 20vw;
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
  font-size: 2vw;
  height: 4vw;
  line-height: 4vw;
  background: #000000;
  color: white;
  border-bottom-left-radius: 1vh;
  border-bottom-right-radius: 1vh;
}
.btn > img {
  width: 14vw;
  height: 14vw;
}
.right {
  vertical-align: top;
  display: inline-block;
  background: #ffffff;
  width: 20vw;
  margin: 0 3vw;
}
</style>
