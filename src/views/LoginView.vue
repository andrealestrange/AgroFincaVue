<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const form = reactive({ correo: '', clave: '' })
const errores = reactive({ correo: '', clave: '' })
const mensaje = ref('')

function validarCorreo() {
  const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.correo)
  errores.correo = ok ? '' : 'Ingresa un correo válido (ej. nombre@correo.com)'
}
function validarClave() {
  errores.clave = form.clave.length >= 6 ? '' : 'La contraseña debe tener al menos 6 caracteres'
}

function iniciarSesion() {
  validarCorreo()
  validarClave()
  if (errores.correo || errores.clave) {
    mensaje.value = ''
    return
  }
  localStorage.setItem('agrofinca_sesion', JSON.stringify({ correo: form.correo }))
  mensaje.value = '✅ Sesión iniciada correctamente'
  setTimeout(() => router.push('/'), 800)
}
</script>

<template>
  <main>
    <section class="formulario" aria-labelledby="titulo-login">
      <h1 id="titulo-login">Iniciar sesión</h1>

      <form @submit.prevent="iniciarSesion" novalidate>
        <label for="correo">Correo electrónico</label>
        <input
          type="email" id="correo" v-model="form.correo" required
          :class="{ invalido: errores.correo }" @input="validarCorreo"
        />
        <small v-if="errores.correo" class="error-texto">{{ errores.correo }}</small>

        <label for="clave">Contraseña</label>
        <input
          type="password" id="clave" v-model="form.clave" required minlength="6"
          :class="{ invalido: errores.clave }" @input="validarClave"
        />
        <small v-if="errores.clave" class="error-texto">{{ errores.clave }}</small>

        <button type="submit" class="btn">Iniciar sesión</button>
      </form>

      <p v-if="mensaje" class="alerta mostrar ok">{{ mensaje }}</p>

      <p class="ayuda">
        ¿No tienes cuenta?
        <RouterLink to="/registro"><strong>Regístrate aquí</strong></RouterLink>
      </p>
    </section>
  </main>
</template>