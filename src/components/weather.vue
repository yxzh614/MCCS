<template>
  <div class="main">
    <div class="title">实时天气情况</div>
    <div>
      <div class="flex">
        <div>体感温度：{{weather.fl}}°C</div>
        <div>温度：{{weather.tmp}}°C</div>
        <div>天气情况：{{weather.cond_txt}}</div>
        <div>风向：{{weather.wind_dir}}</div>
        <div>风力：{{weather.wind_sc}}级</div>
        <div>风速：{{weather.wind_spd}}公里/小时</div>
        <div>相对湿度：{{weather.hum}}</div>
        <div>降水量：{{weather.pcpn}}</div>
        <div>大气压强：{{weather.pres}}</div>
        <div>能见度：{{weather.vis}}公里</div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      msg: 'weather',
      cid: '',
      weather: {}
    }
  },
  mounted () {
    axios.get('https://search.heweather.com/find?location=沈阳&key=70714365066144bb8ac0307f9fa53b84').then(
      (res) => {
        let data = res.data.HeWeather6[0].basic
        console.table(data)
        this.cid = data[0].cid
        // axios.get('https://free-api.heweather.com/s6/weather/now?location=沈阳&key=70714365066144bb8ac0307f9fa53b84').then(
        //   (res) => {
        //     let data = res.data.HeWeather6[0].now
        //     console.log(data)
        //     this.weather = data
        //   }
        // )
        this.weather = {
          cloud: '0',
          cond_code: '100',
          cond_txt: '晴',
          fl: '33',
          hum: '42',
          pcpn: '0.0',
          pres: '1004',
          tmp: '32',
          vis: '20',
          wind_deg: '186',
          wind_dir: '南风',
          wind_sc: '2',
          wind_spd: '7'
        }
      }
    )
  }
}
</script>

<style scoped>
.main {
  padding: 1vh 1vw;
}
.flex {
  height: 1vh;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
}
.flex > div {
  padding: 0 0.5vw;
  margin: 0.5vh 0;
  border-radius: 0.5vh;
  background: #00c3ff;
}
</style>
