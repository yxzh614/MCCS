<template>
  <div class="main">
    <div class="left">
      <div class="bar">
        <div class="label-top" :style="{margin: amountLaft}">注水进度</div>
        <div class="warn">超量报警</div>
        <div class="water-bar" :style="{background: waterBarBackground}"></div>
        <div class="label-bottom" :style="{margin: targetWater}">注水标量</div>
      </div>
      <div class="time-pic">
        <div id="main" style="width: 100%;height:100%;"></div>
      </div>
      <div class="tin-skin">
        <div class="tin-title"><span>水箱剩余水量</span></div>
        <div class="tin" :style="{background: tinBackground}"></div>
      </div>
    </div>
    <div class="right">
      <div>
        <ul>
          <li>注水量：<input :class="{editing: editing}" :readonly="!editing" type="text" v-model.lazy="target"></li>
          <li>超量报警：<input :class="{editing: editing}" :readonly="!editing" type="text" v-model.lazy="over"></li>
          <li>
            开始注水：<input :class="{editing: editing}" :readonly="!editing" type="date" v-model="startTime">
          </li>
          <li>
            结束注水：<input :class="{editing: editing}" :readonly="!editing" type="date" v-model="endTime">
          </li>
        </ul>
        <div class="btn">
          <button @click="editing = true">修改</button><button @click="editing = false">保存</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      editing: false,
      startTime: '',
      endTime: '',
      amount: 0,
      over: 100,
      target: 90,
      tinMax: 200,
      tinAmount: 150,
      c: null,
      arr: []
    }
  },
  computed: {
    tinBackground () {
      return `linear-gradient(to top, #7bb3ff ${this.tinPercent}vh, #ffffff ${this.tinPercent}vh)`
    },
    waterBarBackground () {
      return `linear-gradient(to right, #7bb3ff ${this.num1}vw, #969696 ${this.num1}vw,#969696 ${this.num2}vw,#ffef29 ${this.num2}vw)`
    },
    amountLaft () {
      return `0 ${this.num1 - 3}vw`
    },
    targetWater () {
      return `0 ${this.num2 - 3}vw`
    },
    num1 () {
      return 41 * (this.amount / this.over)
    },
    num2 () {
      return 41 * (this.target / this.over)
    },
    tinPercent () {
      return 30 * (this.tinAmount / this.tinMax)
    }
  },
  props: [
    'room'
  ],
  methods: {
    initData () {
      this.amount = 0
      this.arr = []
      let i = 0
      while (i++ < 20) {
        this.arr.push(0)
      }
    }
  },
  watch: {
    room: function (newRoom) {
      let d = this.$rooms.roomList[newRoom].water
      this.editing = false
      this.startTime = d.startTime
      this.endTime = d.endTime
      this.amount = d.target
      this.over = d.over
      this.target = d.target
      this.tinMax = d.tinMax
      this.tinAmount = d.tinAmount
      this.initData()
    }
  },
  mounted () {
    this.initData()
    this.c = this.$echarts.init(document.getElementById('main'))
    setInterval(() => {
      if (this.amount < this.target) {
        this.amount++
        this.tinAmount--
      }
      this.arr.push(this.amount)
      this.arr.shift()
      this.c.setOption({
        title: {
          text: '注水情况',
          textStyle: {
            align: 'center'
          }
        },
        xAxis: {
          type: 'category',
          data: this.arr,
          boundaryGap: false
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: this.arr,
          type: 'line',
          areaStyle: {}
        }],
        animation: false
      })
    }, 500)
  }
}
</script>

<style scoped>
.editing {
  border-bottom: 1px solid black;
}
.main {
  background: white;
  width: 70vw;
  border-radius: 2vh;
  box-shadow: 0px 0px 5vw #949494;
}
.left {
  display: inline-block;
  padding: 2vh 2vw;
  border-radius: 2vh;
  width: 46vw;
  height: 42vh;
  text-align: center;
}
.right {
  position: relative;
  float: right;
  width: 15vw;
  padding: 2vh 2vw;
  height: 42vh;
  vertical-align: top;
  background: #949494;
  border-top-right-radius: 2vh;
  border-bottom-right-radius: 2vh;
}
.btn {
  position: absolute;
  bottom: 0;
  width: 100%;
  margin-left: -2vw;
  border-top: white solid 1px;
  background: #3c3c3c;
  border-bottom-right-radius: 2vh;
}
button:last-child {
  border-left: white solid 1px;
}
ul {
  list-style: none;
  padding: 0;
  color: white;
}
ul * {
  background: #949494;
  color: white;
}
input {
  outline: none;
  border: 0;
  border-bottom: 1px solid transparent;
  width: 100%;
}
button {
  margin: 0;
  padding: 0;
  border: 0;
  width: 50%;
  height: 4vh;
  background: transparent;
  color: white;
  background: #3c3c3c;
  border-bottom-right-radius: 2vh;
}
.tin-skin {
  width: 10vw;
  margin: 0 0 0 1vw;
}
.tin-title {
  width: 8vw;
  margin-left: 2vw;
  background: #949494;
  border-top-left-radius: 1vh;
  border-top-right-radius: 1vh;
  color: white;
}
.tin {
  width: 10vw;
  height: 30vh;
  border: 1vw solid #949494;
  border-radius: 1vh;
}
.time-pic {
  float: right;
  width: 30vw;
  height: 30vh;
  margin: 3vh 1vw 0 0;
  border: 1px solid black;
}
.warn {
  float: right;
  background: red;
  height: 3vh;
  line-height: 3vh;
  padding: 0 0.2vw;
  color: white;
}
.label-top {
  width: 6vw;
}
.label-bottom {
  width: 6vw;
}
.water-bar {
  height: 3vh;
  width: 41vw;
}
</style>
