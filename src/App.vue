<script setup>
import NavBar from './components/NavBar.vue'
</script>

<template>
  <NavBar />

  <main>
    <RouterView />
  </main>

  <footer>
  <nav class="footer-links">
    <RouterLink to="/terminos">Términos y condiciones</RouterLink>
    <RouterLink to="/privacidad">Política de privacidad</RouterLink>
    <a href="mailto:contacto@agrofinca.com">Contacto</a>
  </nav>
  <p>© 2026 AgroFinca · Todos los derechos reservados · Sahagún, Córdoba, Colombia</p>
  </footer>

  <a
    class="whatsapp"
    href="https://wa.me/57XXXXXXXXXX?text=Hola%20AGROFINCA%2C%20quiero%20información%20de%20sus%20productos"
    target="_blank"
    rel="noopener"
    aria-label="Escribir por WhatsApp"
  >
    <i class="fa-brands fa-whatsapp"></i>
  </a>
</template>
