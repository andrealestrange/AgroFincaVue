<script setup>
import { ref } from 'vue'
import { useCarritoStore } from '../stores/carrito'

const abierto = ref(false)
const carrito = useCarritoStore()
</script>

<template>
  <header class="site-header">
    <input type="checkbox" id="menu-toggle" class="menu-toggle" v-model="abierto" />
    <label for="menu-toggle" class="menu-boton" aria-label="Abrir menú">
      <span></span><span></span><span></span>
    </label>

    <RouterLink to="/" class="logo">
      <img src="/img/logo.png" alt="Logo AgroFinca" />
      <span>AGROFINCA</span>
    </RouterLink>

    <nav aria-label="Menú principal" @click="abierto = false">
      <ul>
        <li><RouterLink to="/">Inicio</RouterLink></li>
        <li><RouterLink to="/catalogo">Productos</RouterLink></li>
        <li><RouterLink to="/carrito" class="btn-nav">Carrito</RouterLink></li>
        <li><RouterLink to="/login">Mi cuenta</RouterLink></li>
      </ul>
    </nav>
  </header>
</template>