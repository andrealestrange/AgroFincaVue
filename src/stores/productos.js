import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useProductosStore = defineStore('productos', () => {
  const productos = ref(JSON.parse(localStorage.getItem('productos')) || [])
  const loading = ref(false)
  const error = ref(null)

  // persistencia: cada cambio se guarda en localStorage
  watch(productos, (v) => localStorage.setItem('productos', JSON.stringify(v)), { deep: true })

  async function cargarProductos() {
    if (productos.value.length) return
    loading.value = true
    error.value = null
    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=6')
      if (!res.ok) throw new Error(`Error HTTP ${res.status}`)
      const data = await res.json()
      productos.value = data.map((p) => ({
        id: p.id,
        nombre: p.title,
        categoria: 'Verdura',
        precio: 5000,
        cantidad: 10,
        fecha: '2026-11-01',
        descripcion: p.body,
      }))
    } catch (e) {
      error.value = e.message
    } finally {
      loading.value = false
    }
  }

  function agregarProducto(producto) {
    productos.value.push({ ...producto, id: Date.now() })
  }
  function eliminarProducto(id) {
    productos.value = productos.value.filter((p) => p.id !== id)
  }
  function obtenerPorId(id) {
    return productos.value.find((p) => p.id === Number(id))
  }

  return { productos, loading, error, cargarProductos, agregarProducto, eliminarProducto, obtenerPorId }
})