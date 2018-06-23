<template>
    <div class="main">
      <ul>
        <li @click="$router.push({path: '/control/tempBoard'})">
          <div>设定温度：{{$rooms.roomList[room].temp.set}}°C</div>
          <div>最高温度：{{$rooms.roomList[room].temp.max}}°C</div>
          <div>平均温度：{{$rooms.roomList[room].temp.avg}}°C</div>
          <div>最低温度：{{$rooms.roomList[room].temp.min}}°C</div>
          <p>{{$rooms.roomList[room].temp.state}}</p>
          <img :src="$rooms.roomList[room].temp.pic">
          <div>查看详情</div>
        </li>
        <li>
          <div>设定湿度：{{humidity.setted}}RH</div>
          <div>最高湿度：{{humidity.top}}RH</div>
          <div>平均湿度：{{humidity.avg}}RH</div>
          <div>最低湿度：{{humidity.low}}RH</div>
          <p>{{humidity.hint}}</p>
          <img src="@/assets/success.png">
          <div>查看详情</div>
        </li>
        <li>
          <div>设定水量：{{water.setted}}m³</div>
          <div>已注水量：{{water.already}}m³</div>
          <div>还需注水：{{water.need}}m³</div>
          <div>水箱剩余：{{water.left}}m³</div>
          <p>{{water.hint}}</p>
          <img src="@/assets/warning.png">
          <div>查看详情</div>
        </li>
      </ul>
      <message :room="room"></message>
    </div>
</template>

<script>
import message from './message'
export default {
  data () {
    return {
      temperature: {
        setted: 34,
        top: 50,
        avg: 45,
        low: 40,
        hint: '参数波动范围正常，无需设置'
      },
      humidity: {
        setted: 34,
        top: 50,
        avg: 45,
        low: 40,
        hint: '参数波动范围正常，无需设置'
      },
      water: {
        setted: 34,
        already: 50,
        need: 45,
        left: 40,
        hint: '剩余水量无法满足设定注水量，请检查水箱，并及时注水。'
      }
    }
  },
  components: {
    message
  },
  watch: {
    room: function (newRoom, oldRoom) {
      console.log(newRoom, oldRoom)
    }
  },
  props: [
    'room'
  ]
}
</script>

<style scoped>
.main {
  box-shadow: 0px 0px 5vw #949494;
  border-radius: 2vh;
  width: 70vw;
  background: white;
}
ul {
  list-style: none;
  display: inline-block;
  padding: 3vh 0;
  margin: 0;
  width: 52vw;
  height: 40vh;
}
li {
  display: inline-block;
  width: 13vw;
  height: 39vh;
  margin: 0 2vw;
  box-shadow: 0px 0px 5vw #949494;
  border-radius: 2vh;
  text-align: center;
}
li > div {
  height: 4vh;
  line-height: 4vh;
}
li > p {
  padding: 0 1vw;
  height: 5vh;
  margin: 2vh 0;
}
li > div:first-child {
  background: #949494;
  border-top-left-radius: 2vh;
  border-top-right-radius: 2vh;
  color: white;
}
li > div:last-child {
  background: #949494;
  border-bottom-left-radius: 2vh;
  border-bottom-right-radius: 2vh;
  color: white;
}
li > img {
  width: 10vh;
  height: 10vh;
}
</style>
