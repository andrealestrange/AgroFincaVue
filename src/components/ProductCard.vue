<script setup>
defineProps({
  producto: { type: Object, required: true },
})
defineEmits(['eliminar'])
</script>

<template>
  <article class="card">
    <h3>{{ producto.nombre }}</h3>
    <p class="categoria">{{ producto.categoria }}</p>
    <p class="precio">${{ producto.precio }}</p>
    <p>Disponibles: {{ producto.cantidad }}</p>
    <div class="acciones">
      <RouterLink :to="{ name: 'detail', params: { id: producto.id } }">Ver detalle</RouterLink>
      <button type="button" @click="$emit('eliminar', producto.id)">Eliminar</button>
    </div>
  </article>
</template>