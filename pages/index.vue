<template>
  <section>
    <div id="container" />
    <button @click="handleToggle(true)">
      拖动
    </button>
    <button @click="handleToggle(false)">
      画图
    </button>
  </section>
</template>

<script>
import Stage from './stage'
import Circle from './circle'

export default {
  data() {
    return {
      isDragging: false
    }
  },
  mounted() {
    const stage = new Stage({
      container: 'container',
      width: 1000,
      height: 800
    })
    this.circle = new Circle({
      stage,
      circleFill: 'red',
      strokeColor: 'black',
      strokeWidth: 2
    })
  },
  destroyed() {
    this.circle.removeEventListener()
  },
  methods: {
    handleToggle(mode) {
      this.circle.toggleMode(mode)
      console.log(this.circle.getCircleList())
    }
  }
}
</script>

<style scoped>
</style>
