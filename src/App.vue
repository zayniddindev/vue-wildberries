<script setup>
import ProductList from './components/ProductList.vue'
</script>

<template>
  <ProductList />
</template>

<script>

export default {
  name: 'App',
  components: {
    ProductList
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  transition: 3ms;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
