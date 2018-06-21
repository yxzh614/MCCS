<template>
    <div class="main">
      
    </div>
</template>

<script>
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
  height: 46vh;
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
