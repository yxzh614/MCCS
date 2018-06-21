<template>
  <div class="fixed">
    <slot></slot>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.fixed {
  display: flex;
  flex-flow: column-reverse nowrap;
  justify-content: space-around;
  background: white;
  z-index: 999;
  position: relative;
  /* top: 35%;
  height: 30%;
  left: 35%;
  width: 31%; */
  text-align: center;
  border-radius: 2vh;
  box-shadow: 0 0 5vh black;
}
</style>
