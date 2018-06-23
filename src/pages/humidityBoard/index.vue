<template>
  <div class="humiControl">
    <!-- left -->
    <div class="left">
      <!-- humiIcons -->
      <div class="humiIcons">
        <!-- currentHumi -->
        <div>
          <div>
            <div class="iconMax"></div>
            <span>最高湿度</span>
          </div>
          <div>
            <div class="iconMin"></div>
            <span>最低湿度</span>
          </div>
        </div>
        <!-- oldHumi -->
        <div>
          <div>
            <div class="iconMax"></div>
            <span>最高湿度</span>
          </div>
          <div>
            <div class="iconMin"></div>
            <span>最低湿度</span>
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
      id="currentHumiEchart"
      ref="currentHumiEchart"
      class="echart">
      </div>
      <div
        id="oldHumiEchart"
        ref="oldHumiEchart"
        class="echart">
        </div>
    </div>

    <!-- right -->
    <div class="right">
      <!-- currentShow -->
      <div class="currentShow">
        <p>即时最高湿度:&nbsp;&nbsp;{{currentMaxHumi}}PH</p>
        <p>即时最低湿度:&nbsp;&nbsp;{{currentMinHumi}}PH</p>
        <p>即时平均湿度:&nbsp;&nbsp;{{currentAvgHumi}}PH</p>
      </div>
      <!-- control -->
      <div class="control">
        <p>设定最高湿度:&nbsp;&nbsp;<input
          v-model="controlMaxValue"
          :readOnly="myReadonly"
          :class="{wbg : isWritable}"/>PH</p>
        <p>设定最低湿度:&nbsp;&nbsp;<input
          v-model="controlMinValue"
          :readOnly="myReadonly"
          :class="{wbg : isWritable}"/>PH</p>
        <p>设定平均湿度:&nbsp;&nbsp;<input
          v-model="controlWantValue"
          :readOnly="myReadonly"
          :class="{wbg : isWritable}"/>PH</p>
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
      currentHumiEchart: null,
      oldHumiEchart: null,
      currentHumiDataMax: [30],
      currentHumiDataMin: [20],
      oldHumiDataMax: [18],
      oldHumiDataMin: [15],
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
    minHumiRandom () {
      const oldNum = this.currentHumiDataMin[this.currentHumiDataMin.length - 1]
      const randomNum = parseFloat((Math.random() - 0.5).toFixed(2))
      const newNum = parseFloat((oldNum + randomNum).toFixed(2))
      return newNum
    },
    maxHumiRandom () {
      const oldNum = this.currentHumiDataMax[this.currentHumiDataMax.length - 1]
      const randomNum = parseFloat((Math.random() - 0.5).toFixed(2))
      const newNum = parseFloat((oldNum + randomNum).toFixed(2))
      return newNum
    },
    oldHumiRandom () {
      const num1 = Math.floor(Math.random() * 16) + 15
      const num2 = Math.floor(Math.random() * 16) + 15
      return {
        small: num1 > num2 ? num2 : num1,
        big: num1 > num2 ? num1 : num2
      }
    },
    currentHumiRender () {
      setInterval(() => {
        this.currentHumiDataMax.shift()
        this.currentHumiDataMin.shift()
        this.currentHumiDataMax.push(this.maxHumiRandom())
        this.currentHumiDataMin.push(this.minHumiRandom())
        this.currentHumiEchart.setOption({
          series: [
            {
              data: this.currentHumiDataMax
            },
            {
              data: this.currentHumiDataMin
            }
          ]
        })
      }, 5000)
    },
    oldHumiRender () {
      let oldHumiDataMax = []
      let oldHumiDataMin = []
      for (let index = 0; index < 10; index++) {
        const oldHumi = this.oldHumiRandom()
        oldHumiDataMax.push(oldHumi.big)
        oldHumiDataMin.push(oldHumi.small)
      }
      this.oldHumiDataMax = oldHumiDataMax
      this.oldHumiDataMin = oldHumiDataMin
      this.oldHumiEchart.setOption({
        series: [
          {
            data: this.oldHumiDataMax
          },
          {
            data: this.oldHumiDataMin
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
      this.isWritable = false
    }
  },
  mounted: function () {
    for (let index = 0; index < 9; index++) {
      this.currentHumiDataMax.push(this.maxHumiRandom())
      this.currentHumiDataMin.push(this.minHumiRandom())
      const oldHumi = this.oldHumiRandom()
      this.oldHumiDataMax.push(oldHumi.big)
      this.oldHumiDataMin.push(oldHumi.small)
    }
    const currentHumiOption = {
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
          name: '最高湿度',
          data: this.currentHumiDataMax,
          type: 'line',
          smooth: true
        },
        {
          name: '最低湿度',
          data: this.currentHumiDataMin,
          type: 'line',
          smooth: true
        }
      ]
    }
    const oldHumiOption = {
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
        min: 0
      },
      series: [
        {
          name: '最高湿度',
          data: this.oldHumiDataMax,
          type: 'line',
          smooth: true
        },
        {
          name: '最低湿度',
          data: this.oldHumiDataMin,
          type: 'line',
          smooth: true
        }
      ]
    }
    const dom1 = this.$refs.currentHumiEchart
    const dom2 = this.$refs.oldHumiEchart
    this.currentHumiEchart = this.$echarts.init(dom1)
    this.oldHumiEchart = this.$echarts.init(dom2)
    this.currentHumiEchart.setOption(currentHumiOption)
    this.oldHumiEchart.setOption(oldHumiOption)
    this.currentHumiRender()
  },
  computed: {
    currentMaxHumi: function () {
      return this.currentHumiDataMax[9]
    },
    currentMinHumi: function () {
      return this.currentHumiDataMin[9]
    },
    currentAvgHumi: function () {
      return ((this.currentHumiDataMin[9] + this.currentHumiDataMax[9]) / 2).toFixed(2)
    }
  },
  watch: {
    dataValueStart: function () {
      this.oldHumiRender()
    },
    dataValueEnd: function () {
      this.oldHumiRender()
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
  color: #000 !important;
}
.humiControl {
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
.humiIcons {
  width: 100%;
  height: 60%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  padding: 10% 0 10% 26%;
}
.humiIcons > div > div {
  vertical-align: middle;
}
.humiIcons > div > div > span {
  display: inline-block;
  vertical-align: middle;
}
.humiIcons > div > div > div {
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
