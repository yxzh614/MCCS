<template>
  <div class="flex">
    <div :class="{ dark : selectedBtn === 0 }" @click="goPage(0)">
      <img src="../assets/all.png" alt="">
      <div>温室总览</div>
    </div>
    <div :class="{ dark : selectedBtn === 1 }" @click="goPage(1)">
      <img src="../assets/wed.png" alt="">
      <div>温度设定</div>
    </div>
    <div :class="{ dark : selectedBtn === 2 }" @click="goPage(2)">
      <img src="../assets/sid.png" alt="">
      <div>湿度设定</div>
    </div>
    <div :class="{ dark : selectedBtn === 3 }" @click="goPage(3)">
      <img src="../assets/water.png" alt="">
      <div>注水设定</div>
    </div>
    <div :class="{ dark : selectedBtn === 4 }" @click="goPage(4)">
      <img src="../assets/eq.png" alt="">
      <div>设备详情</div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      selectedBtn: 0
    }
  },
  computed: {
    selected1 () {
      return this.selectedBtn === 0
    }
  },
  methods: {
    goPage (index) {
      this.selectedBtn = index
      switch (index) {
        case 0: this.$router.push({name: 'controlBoard'}); break
        case 1: this.$router.push({name: 'tempBoard'}); break
        case 2: this.$router.push({name: 'water'}); break
        case 3: this.$router.push({name: 'water'}); break
        case 4: this.$router.push({name: 'controlBoard'}); break
      }
    }
  }
}
</script>

<style scoped>
.flex {
  display: flex;
  flex-flow: column nowarp;
  justify-content: space-between;
  width: 70vw;
  margin: 5vh 0;
}
.flex > div {
  width: 10vw;
  height: 10vh;
  background: white;
  text-align: center;
  border-radius: 1vh;
}
img {
  width: 7vh;
  height: 7vh;
}
img + div {
  height: 3vh;
  background-color: #3c3c3c;
  border-bottom-left-radius: 1vh;
  border-bottom-right-radius: 1vh;
  color: white;
}
.dark {
  background-color: #b2b2b2 !important;
}
</style>
