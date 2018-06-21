<template>
    <div class="main">
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
</template>

<script>
export default {
  data () {
    return {
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
      return 65 * (this.amount / this.over)
    },
    num2 () {
      return 65 * (this.target / this.over)
    },
    tinPercent () {
      return 30 * (this.tinAmount / this.tinMax)
    }
  },
  props: [
    'room'
  ],
  mounted () {
    console.log(this.$echarts)
    this.amount = 0
    this.c = this.$echarts.init(document.getElementById('main'))
    let i = 0
    while (i++ < 30) {
      this.arr.push(0)
    }
    let xarr = []
    i = 0
    while (i++ < 30) {
      xarr.push()
    }
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
    }, 5000)
  }
}
</script>

<style scoped>
.main {
  padding: 2vh;
  box-shadow: 0px 0px 5vw #949494;
  border-radius: 2vh;
  width: 70vw;
  background: white;
  height: 42vh;
  text-align: center;
}
.tin-skin {
  width: 15vw;
  margin: 0 0 0 1vw;
}
.tin-title {
  width: 9vw;
  margin-left: 3vw;
  background: #949494;
  border-top-left-radius: 1vh;
  border-top-right-radius: 1vh;
  color: white;
}
.tin {
  width: 13vw;
  height: 30vh;
  border: 1vw solid #949494;
  border-radius: 1vh;
}
.time-pic {
  float: right;
  width: 50vw;
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
  width: 65vw;
}
</style>
