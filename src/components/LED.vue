<template>
  <div :class="{ on: 'on' === state, error: 'error' === state, off: state === 'off'}"></div>
</template>

<script>
export default {
  props: [
    'state'
  ]
}
</script>

<style scoped>
div {
  display: inline-block;
  vertical-align: baseline;
  width: 2vw;
  height: 0.9em;
  margin-left: 0.5vw;
}
.on {
  background: green;
}
.off {
  background: gray;
}
.error {
  background: red;
}
</style>
