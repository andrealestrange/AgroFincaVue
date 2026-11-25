<script setup>
import { ref } from 'vue'
import { useCarritoStore } from '../stores/carrito'

const carrito = useCarritoStore()
const mensaje = ref('')
const tipo = ref('')

const mostrarPago = ref(false)
const metodoPago = ref('')

const metodos = [
  { id: 'nequi', nombre: 'Nequi' },
  { id: 'daviplata', nombre: 'Daviplata' },
  { id: 'pse', nombre: 'PSE (transferencia bancaria)' },
  { id: 'tarjeta', nombre: 'Tarjeta crédito/débito' },
  { id: 'contraentrega', nombre: 'Pago contra entrega' }
]

const precio = (n) => '$' + Number(n).toLocaleString('es-CO')

function abrirPago() {
  if (carrito.items.length === 0) {
    mensaje.value = 'Tu carrito está vacío. Agrega productos antes de pagar.'
    tipo.value = 'err'
    return
  }
  mensaje.value = ''
  metodoPago.value = ''
  mostrarPago.value = true
}

function cerrarPago() {
  mostrarPago.value = false
}

function confirmarPago() {
  if (!metodoPago.value) return
  const metodo = metodos.find((m) => m.id === metodoPago.value)

  carrito.vaciar()
  mostrarPago.value = false
  mensaje.value = `✅ ¡Gracias por tu compra! Pagaste con ${metodo.nombre}. Tu pedido fue registrado.`
  tipo.value = 'ok'
}
</script>

<template>
  <main class="carrito-pagina">
    <h1>Ver carrito</h1>

    <section class="carrito-tarjeta" aria-label="Productos del carrito">
      <ul class="carrito-lista">
        <li v-if="carrito.items.length === 0">Tu carrito está vacío.</li>
        <li v-for="item in carrito.items" :key="item.id">
          {{ item.nombre }}
          <span v-if="item.presentacion">({{ item.presentacion }})</span>
          x{{ item.cantidad }} — {{ precio(item.precio * item.cantidad) }}
        </li>
      </ul>

      <p class="carrito-total">
        <span>Total</span>
        <strong>{{ precio(carrito.total) }}</strong>
      </p>
    </section>

    <button
      type="button"
      class="carrito-pagar"
      :disabled="carrito.items.length === 0"
      @click="abrirPago"
    >
      Pagar
    </button>

    <p v-if="mensaje" :class="['carrito-mensaje', tipo]">{{ mensaje }}</p>

    <!-- Modal método de pago -->
    <div v-if="mostrarPago" class="modal-fondo" @click.self="cerrarPago">
      <div class="modal" role="dialog" aria-label="Método de pago">
        <h2>Método de pago</h2>

        <label v-for="m in metodos" :key="m.id" class="opcion">
          <input type="radio" name="metodo" :value="m.id" v-model="metodoPago" />
          {{ m.nombre }}
        </label>

        <p v-if="!metodoPago" class="aviso">Selecciona un método para continuar.</p>

        <div class="acciones">
          <button type="button" class="btn-sec" @click="cerrarPago">Cancelar</button>
          <button
            type="button"
            class="carrito-pagar"
            :disabled="!metodoPago"
            @click="confirmarPago"
          >
            Confirmar pago
          </button>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.carrito-pagina {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem 1rem 3rem;
  text-align: center;
}

.carrito-pagina h1 {
  color: #0f4d2a;
  margin-bottom: 1.5rem;
}

.carrito-tarjeta {
  background: #fff;
  border-radius: 24px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  padding: 1.5rem 1.75rem;
  text-align: left;
}

.carrito-lista {
  list-style: none;
  margin: 0 0 1.5rem;
  padding: 0;
}

.carrito-lista li {
  margin-bottom: 0.4rem;
}

.carrito-total {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0;
  font-size: 1.2rem;
}

.carrito-total span {
  font-weight: 700;
}

.carrito-total strong {
  color: #1f9d4d;
  font-size: 2rem;
}

.carrito-pagar {
  margin-top: 1.5rem;
  background: #1a803f;
  color: #fff;
  border: none;
  border-radius: 999px;
  padding: 1rem 3.5rem;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
}

.carrito-pagar:hover {
  background: #146631;
}

.carrito-mensaje {
  margin-top: 1rem;
  font-weight: 600;
}
.carrito-mensaje.ok { color: #1a803f; }
.carrito-mensaje.err { color: #c0392b; }
</style>