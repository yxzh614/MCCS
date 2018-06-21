<template>
  <div>
    <room-list @change="changeRoom"></room-list>
    <router-view :room="room"></router-view>
    <btn-list></btn-list>
  </div>
</template>

<script>
import btnList from '@/components/btnList'
import roomList from '@/components/roomList'
export default {
  data () {
    return {
      room: undefined
    }
  },
  methods: {
    changeRoom (e) {
      this.room = e.room
    }
  },
  components: {
    btnList,
    roomList
  }
}
</script>

<style scoped>
</style>
