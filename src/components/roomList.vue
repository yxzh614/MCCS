<template>
  <div class="main">
    <div>温室列表</div>
    <ul>
      <li v-for="room in roomList"
          :key="room"
          :class="{ dark: selectedRoom === room }"
          @click="changeRoom(room)"
          >{{room}}号棚</li>
          <li>
            <input v-model="newRoomNum" v-if="showRoomSelect" @keypress="newRoom" type="text" placeholder="请输入大棚编号">
          </li>
    </ul>
    <div>
      <button @click="showRoomSelect = !showRoomSelect"><img src="../assets/add.png" alt=""></button>
      <button><img src="../assets/edit.png" alt=""></button>
      <button @click="deleteRoom()"><img src="../assets/delete.png" alt=""></button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      roomList: [
        1,
        2,
        3,
        4
      ],
      selectedRoom: 1,
      showRoomSelect: false,
      newRoomNum: ''
    }
  },
  methods: {
    changeRoom (room) {
      this.selectedRoom = room
      this.$emit('change', {room: this.selectedRoom})
    },
    newRoom (e) {
      console.log(e)
      if (e.charCode === 13) {
        this.roomList.push(this.newRoomNum)
        this.newRoomNum = ''
        this.showRoomSelect = false
      } else if (e.charCode < 48 || e.charCode > 57) {
        e.preventDefault()
      }
    },
    deleteRoom () {
      let index = this.roomList.indexOf(this.selectedRoom)
      console.log(index)
      this.roomList.splice(index, 1)
      if (index === this.roomList.length - 1) {
        this.selectedRoom = this.roomList[index - 1]
      } else {
        this.selectedRoom = this.roomList[index]
      }
    }
  },
  mounted () {
    this.$emit('change', {room: this.selectedRoom})
  }
}
</script>

<style scoped>
.dark {
  background: #949494;
  color: #ffffff;
}
.main {
  text-align: center;
  box-sizing: border-box;
  float: right;
  width: 20vw;
  height: 61.5vh;
  background: #ffffff;
  border-radius: 2vh;
  position: relative;
}
.main > div {
  height: 5vh;
  line-height: 5vh;
  color: white;
  background: #3c3c3c;
}
.main > div:first-child {
  border-top-left-radius: 2vh;
  border-top-right-radius: 2vh;
}
.main > div:last-child {
  display: flex;
  justify-content: space-between;
  border-bottom-left-radius: 2vh;
  border-bottom-right-radius: 2vh;
  width: 100%;
  position: absolute;
  bottom: 0;
}
button {
  background: #3c3c3c;
  color: #ffffff;
  width: 33.3%;
  border: 0;
}
button:first-child {
  border-bottom-left-radius: 2vh;
}
button:last-child {
  border-bottom-right-radius: 2vh;
}
button > img {
  width: 2vh;
  height: 2vh;
}
ul {
  margin: 1vh 0 0 0;
  list-style: none;
  padding: 0;
}
li {
  height: 5vh;
  line-height: 5vh;
}
input {
  width: 70%;
  height: 3vh;
  line-height: 5vh;
}
</style>
