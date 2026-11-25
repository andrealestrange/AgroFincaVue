import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useProductosStore = defineStore('productos', () => {
  const productos = ref([])
  const loading = ref(false)
  const error = ref(null)

  async function cargarProductos() {
    if (productos.value.length) return
    loading.value = true
    error.value = null
    try {
      const res = await fetch('/data/productos.json')
      if (!res.ok) {
        if (res.status === 404) throw new Error('No se encontró el archivo de productos (error 404).')
        if (res.status >= 500) throw new Error('El servidor tuvo un problema (error ' + res.status + ').')
        throw new Error('No se pudieron cargar los productos (código ' + res.status + ').')
      }
      productos.value = await res.json()
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