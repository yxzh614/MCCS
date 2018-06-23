<template>
  <div class="right">
    <div>
      <ul>
        <li>温室编号:{{$rooms.roomList[room].id}}</li>
        <li>使用时间:<input :class="{editing: editing}" :readonly="!editing" type="date" v-model="time"></li>
        <li>主要功能:<input :class="{editing: editing}" :readonly="!editing" type="text" v-model="feature"></li>
      </ul>
    </div>
    <div class="bz">
      备注：<br>
      <textarea id="rev" :readonly="!editing" type="plain" v-model="bz"></textarea>
      <div>
        <button @click="edit">修改</button><button @click="editing = false">保存</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      time: '',
      feature: '',
      bz: '',
      editing: false
    }
  },
  mounted () {
    this.loadRoomByIdx(this.room)
  },
  methods: {
    edit (e) {
      this.editing = true
      document.getElementById('rev').focus()
    },
    loadRoomByIdx (Idx) {
      this.time = this.$rooms.roomList[Idx].useTime
      this.bz = this.$rooms.roomList[Idx].beizu
      this.feature = this.$rooms.roomList[Idx].mainFunction
    }
  },
  props: [
    'room'
  ],
  watch: {
    room: function (newRoom, oldRoom) {
      if (newRoom !== undefined) {
        this.loadRoomByIdx(newRoom)
      }
    }
  }
}
</script>

<style scoped>
.editing {
  border-bottom: 1px solid black;
}
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
  padding-left: 3vw;
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
textarea {
  resize: none;
  outline: none;
  background: #3c3c3c;
  border: 0;
  color: white;
  width: 100%;
  height: 80%;
}
input {
  resize: none;
  outline: none;
  background: #949494;
  border: 0;
  color: white;
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
  width: 50%;
  height: 4vh;
  background: transparent;
  color: white;
}
button:first-child {
  border-right: white solid 1px;
}
</style>
