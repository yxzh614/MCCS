<template>
  <div>
    <preview :room="room"></preview>
  </div>
</template>

<script>
import preview from '@/pages/controlBoard/preview'
export default {
  components: {
    preview
  },
  props: [
    'room'
  ]
}
</script>
