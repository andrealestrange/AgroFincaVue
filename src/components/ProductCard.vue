<script setup>
import { ref } from 'vue'
import { useCarritoStore } from '../stores/carrito'

const props = defineProps({
  producto: { type: Object, required: true },
})

const emit = defineEmits(['agregado'])

const carrito = useCarritoStore()
const aviso = ref(false)

function agregar() {
  carrito.agregar(props.producto)
  emit('agregado', props.producto)
  aviso.value = true
  setTimeout(() => (aviso.value = false), 2000)
}
</script>

<template>
  <article class="card">
    <div class="info">
      <h2>
        <RouterLink :to="'/producto/' + producto.id">{{ producto.nombre }}</RouterLink>
      </h2>
      <img :src="producto.imagen" :alt="producto.nombre" />
      <p>{{ producto.presentacion }}</p>
      <p class="precio">${{ producto.precio.toLocaleString('es-CO') }}</p>
    </div>
    <button type="button" class="btn" @click="agregar">Agregar</button>
    <p v-if="aviso" class="aviso-agregado">✅ Producto agregado al carrito</p>
  </article>
</template>