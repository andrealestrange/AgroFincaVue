<script setup>
import { onMounted } from 'vue'
import { useProductosStore } from '../stores/productos'
import ProductCard from '../components/ProductCard.vue'

const store = useProductosStore()
onMounted(() => store.cargarProductos())
</script>

<template>
  <section>
    <h1>Catálogo de productos</h1>
    <p v-if="store.loading">Cargando productos...</p>
    <p v-else-if="store.error" class="error">{{ store.error }}</p>
    <p v-else-if="!store.productos.length">No hay productos todavía.</p>
    <div v-else class="grid-cards">
      <ProductCard
        v-for="p in store.productos"
        :key="p.id"
        :producto="p"
        @eliminar="store.eliminarProducto"
      />
    </div>
  </section>
</template>