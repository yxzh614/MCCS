<template>
  <div class="main">
    <div class="title">设备列表</div>
    <div class="flex">
      <div class="list-item">
        <div>风机 01<LED :state="'on'"></LED></div>
        <div>风机 02<LED :state="'on'"></LED></div>
        <div>风机 03<LED :state="states[state1]"></LED></div>
        <div>风机 04<LED :state="states[state1]"></LED></div>
      </div>
      <div class="list-item">
        <div>水泵 01<LED :state="'on'"></LED></div>
        <div>水泵 02<LED :state="'on'"></LED></div>
        <div>水泵 03<LED :state="states[state1]"></LED></div>
        <div>水泵 04<LED :state="states[state1]"></LED></div>
      </div>
      <div class="list-item">
        <div>喷雾 01<LED :state="'on'"></LED></div>
        <div>喷雾 02<LED :state="'on'"></LED></div>
        <div>喷雾 03<LED :state="'on'"></LED></div>
        <div>喷雾 04<LED :state="'on'"></LED></div>
        <div>喷雾 05<LED :state="states[state1]"></LED></div>
        <div>喷雾 06<LED :state="states[state1]"></LED></div>
        <div>喷雾 07<LED :state="states[state1]"></LED></div>
        <div>喷雾 08<LED :state="'error'"></LED></div>
      </div>
      <div class="list-item">
        <div>温度传感器 01<LED :state="'on'"></LED></div>
        <div>温度传感器 02<LED :state="'on'"></LED></div>
        <div>温度传感器 03<LED :state="'on'"></LED></div>
        <div>温度传感器 04<LED :state="'on'"></LED></div>
      </div>
    </div>
  </div>
</template>

<script>
import LED from '@/components/LED'
export default {
  data () {
    return {
      states: ['on', 'off', 'error'],
      state1: 0,
      state2: 1,
      state3: 2,
      interval: null
    }
  },
  mounted () {
    this.state1 = 0
    if (!this.interval) {
      this.interval = setInterval(() => {
        this.state1 = (this.state1 + 1) % 2
        console.log(this.state1)
      }, 1000)
    }
  },
  destroyed () {
    clearInterval(this.interval)
  },
  components: {
    LED
  }
}
</script>

<style scoped>
.main {
  background: #fff;
  width: 70vw;
  height: 46vh;
  border-radius: 2vh;
}
.title {
  text-align: center;
  background: #949494;
  color: #fff;
  height: 5vh;
  line-height: 5vh;
  border-top-right-radius: 2vh;
  border-top-left-radius: 2vh;
}
.flex {
  padding: 7vh 7vw;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
}
.list-item {
  display: flex;
  flex-flow: column nowrap;
}
.list-item > div {
  margin: 0.5vh 1vw;
}
</style>
