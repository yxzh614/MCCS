<template>
  <div>
    <room-list></room-list>
    <router-view></router-view>
    <btn-list></btn-list>
  </div>
</template>

<script>
import btnList from '@/components/btnList'
import roomList from '@/components/roomList'
export default {
  components: {
    btnList,
    roomList
  }
}
</script>

<style scoped>
</style>
