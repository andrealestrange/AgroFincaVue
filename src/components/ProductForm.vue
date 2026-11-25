<script setup>
import { reactive, computed } from 'vue'

const emit = defineEmits(['guardar'])

const form = reactive({
  nombre: '',
  categoria: 'Verdura',
  precio: '',
  cantidad: '',
  fecha: '',
  descripcion: '',
})

const errores = computed(() => ({
  nombre: form.nombre.trim().length < 3 ? 'Mínimo 3 caracteres' : '',
  precio: !(Number(form.precio) > 0) ? 'El precio debe ser mayor a 0' : '',
  cantidad: !(Number(form.cantidad) >= 1) ? 'La cantidad mínima es 1' : '',
  fecha: !form.fecha ? 'Selecciona una fecha' : '',
  descripcion: form.descripcion.trim().length < 10 ? 'Mínimo 10 caracteres' : '',
}))

const esValido = computed(() => Object.values(errores.value).every((e) => !e))

function enviar() {
  if (!esValido.value) return
  emit('guardar', {
    ...form,
    precio: Number(form.precio),
    cantidad: Number(form.cantidad),
  })
  form.nombre = ''
  form.precio = ''
  form.cantidad = ''
  form.fecha = ''
  form.descripcion = ''
}
</script>

<template>
  <form @submit.prevent="enviar" novalidate>
    <label for="nombre">Nombre del producto</label>
    <input id="nombre" v-model="form.nombre" :class="{ invalid: form.nombre && errores.nombre }" required />
    <small v-if="form.nombre && errores.nombre" class="error">{{ errores.nombre }}</small>

    <label for="categoria">Categoría</label>
    <select id="categoria" v-model="form.categoria">
      <option>Verdura</option>
      <option>Fruta</option>
      <option>Lácteo</option>
      <option>Grano</option>
      <option>Otro</option>
    </select>

    <label for="precio">Precio (COP)</label>
    <input id="precio" type="number" min="1" v-model="form.precio" :class="{ invalid: form.precio && errores.precio }" required />
    <small v-if="form.precio && errores.precio" class="error">{{ errores.precio }}</small>

    <label for="cantidad">Cantidad disponible</label>
    <input id="cantidad" type="number" min="1" v-model="form.cantidad" :class="{ invalid: form.cantidad && errores.cantidad }" required />
    <small v-if="form.cantidad && errores.cantidad" class="error">{{ errores.cantidad }}</small>

    <label for="fecha">Fecha de cosecha</label>
    <input id="fecha" type="date" v-model="form.fecha" required />

    <label for="descripcion">Descripción</label>
    <textarea id="descripcion" v-model="form.descripcion" :class="{ invalid: form.descripcion && errores.descripcion }" required></textarea>
    <small v-if="form.descripcion && errores.descripcion" class="error">{{ errores.descripcion }}</small>

    <button type="submit" :disabled="!esValido">Guardar producto</button>
  </form>
</template>