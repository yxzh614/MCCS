<template>
  <div class="main">
    <div>温室列表</div>
    <ul>
      <li v-for="(room, index) in $rooms.roomList"
          :key="index"
          :class="{ dark: selectedRoomIdx === index }"
          @click="changeRoom(index)"
          ><span v-if="showRoomSelect !== index">{{room.id}}号棚</span>
            <input v-model="room.id" v-if="showRoomSelect === index" @keypress="newRoom" type="text" placeholder="请输入大棚编号">
          </li>
    </ul>
    <div>
      <button @click="alert('请联系管理员添加温室！')"><img src="../assets/add.png" alt=""></button>
      <button @click="showRoomSelect = selectedRoomIdx"><img src="../assets/edit.png" alt=""></button>
      <button @click="deleteRoom"><img src="../assets/delete.png" alt=""></button>
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
      selectedRoomIdx: 0,
      showRoomSelect: false,
      newRoomNum: ''
    }
  },
  methods: {
    alert (t) {
      alert(t)
    },
    changeRoom (room) {
      this.selectedRoomIdx = room
      this.$emit('change', {room: this.selectedRoomIdx})
    },
    newRoom (e) {
      console.log(e)
      if (e.charCode === 13) {
        // let newRoom = {
        //   id: Number(this.newRoomNum),
        //   useTime: '2018-06-02',
        //   mainFunction: '',
        //   beizu: ''
        // }
        // this.roomList.push(newRoom)
        // this.newRoomNum = ''
        this.showRoomSelect = false
      } else if (e.charCode < 48 || e.charCode > 57) {
        e.preventDefault()
      }
    },
    deleteRoom () {
      if (confirm('确认要删除吗？')) {
        console.log(1)
        this.$rooms.deleteRoomByIdx(this.selectedRoomIdx)
        if (this.selectedRoomIdx >= this.roomList.length) {
          this.selectedRoomIdx -= 1
        }
        this.changeRoom(this.selectedRoomIdx - 1)
        this.changeRoom(this.selectedRoomIdx)
      }
    }
  },
  mounted () {
    this.roomList = this.$rooms.roomList
    this.$emit('change', {room: this.selectedRoomIdx})
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
