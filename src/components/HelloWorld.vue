<template>
  <div>
    <h1>{{ message }}</h1>
    <button @click="increment">Click me</button>
    <p>Clicked {{ count }} times</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: 'Hello, World!',
      count: 0
    }
  },
  methods: {
    increment() {
      this.count++
    }
  }
}
</script>
