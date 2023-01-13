<template>
  <div class="product-card">
    <p>{{ name }}</p>
    <span>Brand: {{ brand }}</span>
    <span>Price: {{ price }}</span>
    <span>Sale: {{ sale }}%</span>
  </div>
</template>

<script>
export default {
  name: 'ProductCard',
  props: {
    name: String,
    brand: String,
    price: Number,
    sale: Number,
    sale_price: Number
  }
}
</script>

<style scoped>
.product-card {
  background-color: white;
  padding: 12px;
  border: 1px solid black;
  border-radius: 12px;
  margin: 8px;
}

.product-card:hover {
  background-color: rgb(250, 250, 250);
  border-bottom: 2px solid black;
  cursor: pointer;
}

.product-card p {
  color: black;
  font-size: 16px;
  font-weight: 500;
}

.product-card span {
  color: black;
  font-size: 10px;
  margin: 2px;
}
</style>
