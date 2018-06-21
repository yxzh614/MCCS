<template>
  <div class="tempControl">
    <div>
    </div>
    <div class="echarts">
      <div
      id="echart1"
      ref="echart1"
      class="echart">
      </div>
      <div
        id="echart2"
        ref="echart2"
        class="">
        </div>
    </div>
    <div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      echart1: null,
      tempData: []
    }
  },
  methods: {
    tempRandom () {
      // 55-57随机数
      return Math.floor((Math.random() * 3) + 55)
    },
    render () {
      setInterval(() => {
        this.tempData.shift()
        this.tempData.push(this.tempRandom())
        this.echart1.setOption({
          series: [{
            data: this.tempData
          }]
        })
      }, 3000)
    }
  },
  mounted: function () {
    for (let index = 0; index < 10; index++) {
      this.tempData.push(this.tempRandom())
    }
    console.log(this.tempData)
    const option = {
      xAxis: {
        type: 'category',
        data: ['', '', '', '', '', '', '', '', '', '']
      },
      yAxis: {
        type: 'value',
        min: 55
      },
      series: [{
        data: this.tempData,
        type: 'line',
        smooth: true
      }]
    }
    const dom1 = this.$refs.echart1
    this.echart1 = this.$echarts.init(dom1)
    this.echart1.setOption(option)
    this.render()
  }
}
</script>

<style scoped>
.tempControl {
  height: 46vh;
  width: 70vw;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  background-color: #fff;
}
.echarts {
  height: 46vh;
  width: 45vw;
}
.echart {
  height: 60%;
  width: 100%;
}
</style>
