<script setup>
import { ref, computed, onMounted } from 'vue'
import { useProductosStore } from '../stores/productos'
import { useCarritoStore } from '../stores/carrito'
import ProductCard from '../components/ProductCard.vue'

const store = useProductosStore()
const carrito = useCarritoStore()
const busqueda = ref('')

const filtrados = computed(() => {
  const texto = busqueda.value.toLowerCase().trim()
  return store.productos.filter((p) => p.nombre.toLowerCase().includes(texto))
})

onMounted(() => store.cargarProductos())
</script>

<template>
  <h1 class="titulo-seccion">Productos</h1>

  <form class="buscador" role="search" @submit.prevent>
    <label for="buscar" hidden>Buscar productos</label>
    <input type="search" id="buscar" v-model="busqueda" placeholder="Buscar...">
  </form>

  <section class="grid-productos" aria-label="Catálogo" aria-live="polite">
    <p v-if="store.loading" class="estado"><span class="spinner"></span>Cargando productos…</p>

    <div v-else-if="store.error" class="estado estado--error" role="alert">
      <p>{{ store.error }}</p>
      <button type="button" class="btn btn-pequeno" @click="store.cargarProductos()">Reintentar</button>
    </div>

    <p v-else-if="!filtrados.length" class="estado">No encontramos productos con ese nombre.</p>

    <template v-else>
      <ProductCard
        v-for="p in filtrados"
        :key="p.id"
        :producto="p"
        @agregar="carrito.agregar"
      />
    </template>
  </section>
</template>