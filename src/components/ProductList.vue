<script setup>
import { ref } from 'vue';
import ProductCard from './ProductCard.vue';
import { searchFilters, serachProducts } from '../services/ProductService';

const products = ref({ fetched: [], display: [] });
const filters = ref({ brands: [], sellers: [] });
const query = ref({ query: '', fbrand: '', curr: 'rub', lang: 'en' });
const error = ref({ present: false, message: 'Error' });
const statusText = ref({ show: true, text: "No data" });
const filterIds = ref({ brands: [], sellers: [] });

const fetchProducts = async (e) => {
    try {
        // Prevent page from loading
        e.preventDefault();
        if (!query.value.query) {
            throw new Error("Query Empty")
        }

        // Make status loading
        statusText.value.show = true;
        statusText.value.text = "Loading";

        // Fetch data
        const [fetchedProducts, fetchedFilters] = await Promise.all([serachProducts(query.value), searchFilters(query.value)]);
        if (fetchedProducts.error || fetchedFilters.error) {
            statusText.value.text = "Error while fetching data"
            throw new Error("Error while fetching data")

        }
        if (!fetchedProducts?.data || !fetchedFilters?.data) {
            statusText.value.text = `No data`
            throw new Error(`No data found with ${query.value.query}`)
        }

        statusText.value.show = false
        error.value.present = false;
        error.value.message = ""

        // Render products
        let productsData = [];
        let brandsData = [];
        fetchedProducts.data.products.forEach((item) => {
            productsData.push({ name: item.name, brand: item.brand, brandId: item.brandId, sale: item.sale, sellerId: item.sellerId, price: item.priceU, sale_price: item.salePriceU })
            !brandsData.some(b => b.id == item.brandId) && brandsData.push({ id: item.brandId, name: item.brand, selected: false })
        })
        products.value.fetched = productsData
        products.value.display = productsData

        // Render filters
        filters.value.brands = brandsData
        filters.value.sellers = fetchedFilters.data.filters.find(filter => filter.key == 'ftopsupplier').items.map(b => b = { ...b, selected: false });
    } catch (err) {
        error.value.present = true;
        error.value.message = err.message || err.code
    }
}

const filterProducts = async (brandId, sellerId) => {
    if (brandId) {
        if (filterIds.value.brands.includes(brandId)) {
            filterIds.value.brands = filterIds.value.brands.filter(b => b != brandId);
            filters.value.brands.find(b => b.id == brandId).selected = false
        } else {
            filterIds.value.brands.push(brandId);
            filters.value.brands.find(b => b.id == brandId).selected = true
        }
    }
    if (sellerId) {
        if (filterIds.value.sellers.includes(sellerId)) {
            filterIds.value.sellers = filterIds.value.sellers.filter(s => s != sellerId);
            filters.value.sellers.find(s => s.id == sellerId).selected = false
        } else {
            filterIds.value.sellers.push(sellerId);
            filters.value.sellers.find(s => s.id == sellerId).selected = true
        }
    }
    products.value.display = products.value.fetched.filter(p => {
        return (filterIds.value.brands.length > 0 ? filterIds.value.brands.includes(p.brandId) : true) && (filterIds.value.sellers.length > 0 ? filterIds.value.sellers.includes(p.sellerId) : true)
    })
}

</script>

<template>
    <div class="error" v-if="error.present">
        <div class="error body">
            <p>{{ error.message }}</p>
        </div>
    </div>

    <div class="filters">
        <form @submit="fetchProducts" class="query-form">
            <input v-model="query.query" id="search" type="text" placeholder="Search">
            <button class="submit-button" type="submit">Apply</button>
        </form>
        <div class="filters">
            <div class="brands-filter">
                <h3 v-if="filters.brands.length > 1" class="filter-heading">Brands: </h3>
                <span v-for="brand in filters.brands" :key="brand.id" class="filter-item"
                    :class="{ selected: brand.selected }" @click="filterProducts(brand.id, undefined)">{{
                        brand.name
                    }}</span>
            </div>
            <div class="brands-filter">
                <h3 v-if="filters.sellers.length > 1" class="filter-heading">Sellers: </h3>
                <span v-for="seller in filters.sellers" :key="seller.id" class="filter-item"
                    :class="{ selected: seller.selected }" @click="filterProducts(undefined, seller.id)">{{
                        seller.name
                    }}</span>
            </div>
        </div>
    </div>

    <div class="product-list">
        <hr class="seperator" />
        <div class="card-wrapper">
            <div class="status-text">
                <p v-if="statusText.show">{{ statusText.text }}</p>
            </div>
            <div class="card-body" v-for="product in products.display" :key="product.id">
                <ProductCard :name="product.name" :brand="product.brand" :price="product.price" :sale="product.sale"
                    :sale_price="product.sale_price" />
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: "ProductList",
    components: { ProductCard }
}
</script>

<style scoped>
.query-form {
    display: block;
    width: 100vw;
    height: 51px;
    margin: 12px 0 0 0;
    padding-bottom: 1px;
    overflow: hidden;
}

#search {
    width: 400px;
    height: 50px;
    border: 1px solid black;
    border-radius: 6px;
    padding-left: 14px;
    outline: none;
    font-size: 16px;
    font-weight: 500;
}

.submit-button {
    width: 100px;
    height: 50px;
    line-height: 50px;
    background-color: black;
    color: aliceblue;
    margin-left: 10px;
    border: 1px solid black;
    border-radius: 6px;
    font-weight: 600;
}

.brands-filter {
    height: fit-content;
}

.filter-heading {
    margin: 12px 0 2px 0;
    font-size: 12px;
}

.filter-item {
    line-height: 26px;
    font-size: 12px;
    padding: 4px;
    margin: 10px 2px;
    border: 1px solid #111;
    border-radius: 4px;
}

.filter-item.selected {
    background-color: #111;
    color: white;
}

.filter-item:hover {
    cursor: pointer;
    border-bottom: 2px solid black;
}

.seperator {
    display: block;
    width: 800px;
    margin: 30px 0 10px 0;
    height: 1px;
    background-color: #222;
    border: 0.1px solid #222;
}

.product-list {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

.card-wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}

.card-body {
    width: 30%;
    height: 100px;
    /* margin: 25px; */
}

li {
    list-style: none;
}

.error {
    width: 100%;
    height: fit-content;
    background-color: rgb(219, 27, 27);
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: aliceblue;
    font-size: 22px;
    margin-bottom: 5px;
}
</style>
