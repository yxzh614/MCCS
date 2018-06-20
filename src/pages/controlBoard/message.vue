<template>
  <div class="right">
    <div>
      <ul>
        <li>温室编号:{{number}}</li>
        <li>使用时间:{{time}}</li>
        <li>主要功能:{{feature}}</li>
      </ul>
    </div>
    <div class="bz">
      备注：<br>
      {{bz}}
      <div>
        <button>修改</button>
        <button>保存</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      number: 1,
      time: '',
      feature: '',
      bz: '邹山咀道边棚里 一共20架。一架120联，一天产200斤左右。'
    }
  },
  mounted () {
    this.time = new Date().toLocaleDateString()
  }
}
</script>

<style scoped>
.right {
  background: #949494;
  float: right;
  height: 46vh;
  width: 18vw;
  border-top-right-radius: 2vh;
  border-bottom-right-radius: 2vh;
}
ul {
  list-style: none;
  height: 10vh;
  margin: 3vh 0;
}
li {
  color: white;
}
.bz {
  position: relative;
  background-color: #3c3c3c;
  color: white;
  height: 24vh;
  border-bottom-right-radius: 2vh;
  padding: 3vh 3vw;
}
.bz > div {
  position: absolute;
  bottom: 0;
  width: 100%;
  margin-left: -3vw;
  border-top: white solid 1px;
}
button {
  margin: 0;
  padding: 0;
  border: 0;
  width: 49%;
  height: 4vh;
  background: transparent;
  color: white;
}
button:first-child {
  border-right: white solid 1px;
}
</style>
