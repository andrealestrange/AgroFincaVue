<script setup>
import { useRouter } from 'vue-router'
import { useProductosStore } from '../stores/productos'
import ProductForm from '../components/ProductForm.vue'

const store = useProductosStore()
const router = useRouter()

function guardar(producto) {
  store.agregarProducto(producto)
  router.push('/catalogo')
}
</script>

<template>
  <section>
    <h1>Registrar producto</h1>
    <ProductForm @guardar="guardar" />
  </section>
</template>