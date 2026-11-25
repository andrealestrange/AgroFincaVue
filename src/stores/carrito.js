import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

export const useCarritoStore = defineStore('carrito', () => {
  const items = ref(JSON.parse(localStorage.getItem('agrofinca_carrito')) || [])

  watch(items, (v) => localStorage.setItem('agrofinca_carrito', JSON.stringify(v)), { deep: true })

  const total = computed(() => items.value.reduce((suma, i) => suma + i.precio * i.cantidad, 0))

  function agregar(producto) {
    const existente = items.value.find((i) => i.id === producto.id)
    if (existente) existente.cantidad++
    else items.value.push({ ...producto, cantidad: 1 })
  }
  function quitar(id) {
    items.value = items.value.filter((i) => i.id !== id)
  }
  function vaciar() {
    items.value = []
  }

  return { items, total, agregar, quitar, vaciar }
})