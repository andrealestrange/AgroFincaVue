<script setup>
import { useRoute } from 'vue-router'
import { useProductosStore } from '../stores/productos'

const route = useRoute()
const producto = useProductosStore().obtenerPorId(route.params.id)
</script>

<template>
  <article v-if="producto">
    <h1>{{ producto.nombre }}</h1>
    <p><strong>Categoría:</strong> {{ producto.categoria }}</p>
    <p><strong>Precio:</strong> ${{ producto.precio }}</p>
    <p><strong>Disponibles:</strong> {{ producto.cantidad }}</p>
    <p><strong>Cosecha:</strong> {{ producto.fecha }}</p>
    <p>{{ producto.descripcion }}</p>
  </article>
  <p v-else>Producto no encontrado.</p>
  <RouterLink to="/catalogo">← Volver al catálogo</RouterLink>
</template>