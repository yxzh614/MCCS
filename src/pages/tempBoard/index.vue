<template>
  <div>
    <div
      id="echart1"
      ref="echart1"
      class="echart"></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {
    render () {
      const option = {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line'
        }]
      }
      const dom = this.$refs.echart1
      console.log(dom)
      const echart = this.$echarts.init(dom)
      echart.setOption(option)
    }
  },
  mounted: function () {
    this.render()
  }
}
</script>

<style scoped>
.echart {
  height: 500px;
  width: 700px;
}
</style>
