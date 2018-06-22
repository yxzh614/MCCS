<template>
  <div class="tempControl">
    <!-- left -->
    <div class="left">
      <!-- tempIcons -->
      <div class="tempIcons">
        <!-- currentTemp -->
        <div>
          <div>
            <div class="iconMax"></div>
            <span>最高温度</span>
          </div>
          <div>
            <div class="iconMin"></div>
            <span>最低温度</span>
          </div>
        </div>
        <!-- oldTemp -->
        <div>
          <div>
            <div class="iconMax"></div>
            <span>最高温度</span>
          </div>
          <div>
            <div class="iconMin"></div>
            <span>最低温度</span>
          </div>
        </div>
      </div>
      <!-- DataSelector -->
      <div class="dataSelector">
        <p>起始日期</p>
        <el-date-picker
          v-model="dataValueStart"
          type="date"
          size="mini"
          class="dataPicker"
          placeholder="选择日期">
        </el-date-picker>
        <p>结束日期</p>
        <el-date-picker
          v-model="dataValueEnd"
          type="date"
          size="mini"
          class="dataPicker"
          placeholder="选择日期">
        </el-date-picker>
      </div>
    </div>

    <div class="echarts">
      <div
      id="currentTemEchart"
      ref="currentTemEchart"
      class="echart">
      </div>
      <div
        id="oldTemEchart"
        ref="oldTemEchart"
        class="echart">
        </div>
    </div>

    <!-- right -->
    <div class="right">
      <!-- currentShow -->
      <div class="currentShow">
        <p>即时最高温度:&nbsp;&nbsp;{{currentMaxTemp}}°C</p>
        <p>即时最低温度:&nbsp;&nbsp;{{currentMinTemp}}°C</p>
        <p>即时平均温度:&nbsp;&nbsp;{{currentAvgTemp}}°C</p>
      </div>
      <!-- control -->
      <div class="control">
        <p>即时最高温度:&nbsp;&nbsp;<input
          v-model="controlMaxValue"
          :readOnly="myReadonly"
          :class="{wbg : isWritable}"/>°C</p>
        <p>即时最低温度:&nbsp;&nbsp;<input
          v-model="controlMinValue"
          :readOnly="myReadonly"
          :class="{wbg : isWritable}"/>°C</p>
        <p>即时平均温度:&nbsp;&nbsp;<input
          v-model="controlWantValue"
          :readOnly="myReadonly"
          :class="{wbg : isWritable}"/>°C</p>
        <div class="buttons">
          <button @click="change">更改</button>
          <button @click="save">保存</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      currentTemEchart: null,
      oldTemEchart: null,
      currentTempDataMax: [30],
      currentTempDataMin: [20],
      oldTempDataMax: [18],
      oldTempDataMin: [15],
      dataValueStart: '',
      dataValueEnd: '',
      controlMaxValue: '',
      controlMinValue: '',
      controlWantValue: '',
      myReadonly: true,
      isWritable: false
    }
  },
  methods: {
    minTempRandom () {
      const oldNum = this.currentTempDataMin[this.currentTempDataMin.length - 1]
      const randomNum = parseFloat((Math.random() - 0.5).toFixed(2))
      const newNum = parseFloat((oldNum + randomNum).toFixed(2))
      return newNum
    },
    maxTempRandom () {
      const oldNum = this.currentTempDataMax[this.currentTempDataMax.length - 1]
      const randomNum = parseFloat((Math.random() - 0.5).toFixed(2))
      const newNum = parseFloat((oldNum + randomNum).toFixed(2))
      return newNum
    },
    oldTemRandom () {
      const num1 = Math.floor(Math.random() * 16) + 15
      const num2 = Math.floor(Math.random() * 16) + 15
      return {
        small: num1 > num2 ? num2 : num1,
        big: num1 > num2 ? num1 : num2
      }
    },
    currentTemRender () {
      setInterval(() => {
        this.currentTempDataMax.shift()
        this.currentTempDataMin.shift()
        this.currentTempDataMax.push(this.maxTempRandom())
        this.currentTempDataMin.push(this.minTempRandom())
        this.currentTemEchart.setOption({
          series: [
            {
              data: this.currentTempDataMax
            },
            {
              data: this.currentTempDataMin
            }
          ]
        })
      }, 5000)
    },
    oldTemRender () {
      let oldTempDataMax = []
      let oldTempDataMin = []
      for (let index = 0; index < 10; index++) {
        const oldTem = this.oldTemRandom()
        oldTempDataMax.push(oldTem.big)
        oldTempDataMin.push(oldTem.small)
      }
      this.oldTempDataMax = oldTempDataMax
      this.oldTempDataMin = oldTempDataMin
      this.oldTemEchart.setOption({
        series: [
          {
            data: this.oldTempDataMax
          },
          {
            data: this.oldTempDataMin
          }
        ]
      })
    },
    change () {
      console.log('change')
      this.myReadonly = false
      this.isWritable = true
    },
    save () {
      console.log('save')
      this.myReadonly = true
    }
  },
  mounted: function () {
    for (let index = 0; index < 9; index++) {
      this.currentTempDataMax.push(this.maxTempRandom())
      this.currentTempDataMin.push(this.minTempRandom())
      const oldTem = this.oldTemRandom()
      this.oldTempDataMax.push(oldTem.big)
      this.oldTempDataMin.push(oldTem.small)
    }
    const currentTemOption = {
      grid: {
        left: '0%',
        right: '0%',
        bottom: '0%',
        top: '5%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: ['', '', '', '', '', '', '', '', '', '']
      },
      yAxis: {
        type: 'value',
        min: 15
      },
      series: [
        {
          name: '最高温度',
          data: this.currentTempDataMax,
          type: 'line',
          smooth: true
        },
        {
          name: '最低温度',
          data: this.currentTempDataMin,
          type: 'line',
          smooth: true
        }
      ]
    }
    const oldTemOption = {
      grid: {
        left: '0%',
        right: '0%',
        bottom: '0%',
        top: '5%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: ['', '', '', '', '', '', '', '', '', '']
      },
      yAxis: {
        type: 'value',
        min: 15
      },
      series: [
        {
          name: '最高温度',
          data: this.oldTempDataMax,
          type: 'line',
          smooth: true
        },
        {
          name: '最低温度',
          data: this.oldTempDataMin,
          type: 'line',
          smooth: true
        }
      ]
    }
    const dom1 = this.$refs.currentTemEchart
    const dom2 = this.$refs.oldTemEchart
    this.currentTemEchart = this.$echarts.init(dom1)
    this.oldTemEchart = this.$echarts.init(dom2)
    this.currentTemEchart.setOption(currentTemOption)
    this.oldTemEchart.setOption(oldTemOption)
    this.currentTemRender()
  },
  computed: {
    currentMaxTemp: function () {
      return this.currentTempDataMax[9]
    },
    currentMinTemp: function () {
      return this.currentTempDataMin[9]
    },
    currentAvgTemp: function () {
      return ((this.currentTempDataMin[9] + this.currentTempDataMax[9]) / 2).toFixed(2)
    }
  },
  watch: {
    dataValueStart: function () {
      this.oldTemRender()
    },
    dataValueEnd: function () {
      this.oldTemRender()
    }
  }
}
</script>

<style scoped>
* {
  box-sizing: border-box;
}
.wbg {
  background-color: #fff !important;
}
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
  width: 40vw;
}
.echart {
  height: 48%;
  width: 100%;
}
.left {
  height: 46vh;
  width: 15vw;
}
.tempIcons {
  width: 100%;
  height: 60%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  padding: 10% 0 10% 26%;
}
.tempIcons > div > div {
  vertical-align: middle;
}
.tempIcons > div > div > span {
  display: inline-block;
  vertical-align: middle;
}
.tempIcons > div > div > div {
  display: inline-block;
  height: 2.1vh;
  width: 2vw;
  vertical-align: middle;
}
.iconMax {
  background-color: red;
}
.iconMin {
  background-color: lightgreen;
}
.dataPicker{
  width: 100%;
}
.dataSelector {
  width: 100%;
  height: 40%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-around;
  padding: 6%;
}
.dataSelector p {
  width: 100%;
  margin: 0;
  padding-left: 12%;
}
.right {
  height: 46vh;
  width: 15vw;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
}
.currentShow {
  height: 45%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-around;
  background-color: #949494;
  color: #fff;
}
.currentShow p {
  margin: 0;
  font-size: 12px;
  text-align: center;
}
.control {
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  height: 50%;
  padding-top: 15%;
  background-color: #949494;
  color: #fff;
}
.control p{
  margin: 0;
  font-size: 12px;
  text-align: center;
}
.control p input {
  width: 26%;
  font-size: 12px;
  text-align: right;
  display: inline-block;
  background-color: #949494;
  color: #fff;
  border-style: none;
}
.buttons {
  display: flex;
  flex-flow: row;
}
.buttons button {
  display: inline-block;
  width: 50%;
  height: 5vh;
  background-color: #3c3c3c;
  color: #fff;
  border-style: none;
}
.buttons button:first-child {
  border-right: 1px solid #fff;
}
.buttons button:last-child {
  border-left: 1px solid #fff;
}
</style>
