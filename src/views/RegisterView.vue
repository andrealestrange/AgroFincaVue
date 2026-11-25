<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const form = reactive({
  nombre: '',
  correo: '',
  telefono: '',
  nacimiento: '',
  clave: '',
  clave2: '',
  terminos: false,
})
const errores = reactive({})
const mensaje = ref('')

// Fecha máxima: hoy menos 18 años (mayor de edad)
const hoy = new Date()
const maxNacimiento = new Date(hoy.getFullYear() - 18, hoy.getMonth(), hoy.getDate())
  .toISOString()
  .split('T')[0]

const reglas = {
  nombre: () =>
    /^[A-Za-zÁÉÍÓÚáéíóúÑñ ]{3,60}$/.test(form.nombre)
      ? ''
      : 'Mínimo 3 letras, solo letras y espacios',
  correo: () =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.correo) ? '' : 'Ingresa un correo válido',
  telefono: () =>
    /^3[0-9]{9}$/.test(form.telefono) ? '' : 'Debe tener 10 dígitos y empezar por 3',
  nacimiento: () => {
    if (!form.nacimiento) return 'Ingresa tu fecha de nacimiento'
    if (form.nacimiento < '1930-01-01') return 'Fecha no válida'
    if (form.nacimiento > maxNacimiento) return 'Debes ser mayor de edad'
    return ''
  },
  clave: () => (form.clave.length >= 6 ? '' : 'Mínimo 6 caracteres'),
  clave2: () => (form.clave2 === form.clave && form.clave2 ? '' : 'Las contraseñas no coinciden'),
  terminos: () => (form.terminos ? '' : 'Debes aceptar los términos y condiciones'),
}

function validar(campo) {
  errores[campo] = reglas[campo]()
}

function registrar() {
  Object.keys(reglas).forEach(validar)
  if (Object.values(errores).some((e) => e)) {
    mensaje.value = ''
    return
  }

  const usuarios = JSON.parse(localStorage.getItem('agrofinca_usuarios')) || []
  if (usuarios.some((u) => u.correo === form.correo)) {
    errores.correo = 'Ese correo ya está registrado'
    return
  }

  const { clave2, terminos, ...usuario } = form
  usuarios.push(usuario)
  localStorage.setItem('agrofinca_usuarios', JSON.stringify(usuarios))

  mensaje.value = '✅ Cuenta creada correctamente'
  setTimeout(() => router.push('/login'), 900)
}
</script>

<template>
  <main>
    <section class="formulario" aria-labelledby="titulo-registro">
      <h1 id="titulo-registro">Crear cuenta</h1>

      <form @submit.prevent="registrar" novalidate>
        <label for="nombre">Nombre completo</label>
        <input type="text" id="nombre" v-model="form.nombre" required minlength="3" maxlength="60"
               :class="{ invalido: errores.nombre }" @input="validar('nombre')" />
        <small v-if="errores.nombre" class="error-texto">{{ errores.nombre }}</small>

        <label for="correo">Correo electrónico</label>
        <input type="email" id="correo" v-model="form.correo" required placeholder="nombre@correo.com"
               :class="{ invalido: errores.correo }" @input="validar('correo')" />
        <small v-if="errores.correo" class="error-texto">{{ errores.correo }}</small>

        <label for="telefono">Número de teléfono</label>
        <input type="tel" id="telefono" v-model="form.telefono" required placeholder="3201234567"
               :class="{ invalido: errores.telefono }" @input="validar('telefono')" />
        <small v-if="errores.telefono" class="error-texto">{{ errores.telefono }}</small>

        <label for="nacimiento">Fecha de nacimiento</label>
        <input type="date" id="nacimiento" v-model="form.nacimiento" required
               min="1930-01-01" :max="maxNacimiento"
               :class="{ invalido: errores.nacimiento }" @change="validar('nacimiento')" />
        <span class="ayuda">Debes ser mayor de edad.</span>
        <small v-if="errores.nacimiento" class="error-texto">{{ errores.nacimiento }}</small>

        <label for="clave">Contraseña</label>
        <input type="password" id="clave" v-model="form.clave" required minlength="6"
               placeholder="Mínimo 6 caracteres"
               :class="{ invalido: errores.clave }" @input="validar('clave')" />
        <small v-if="errores.clave" class="error-texto">{{ errores.clave }}</small>

        <label for="clave2">Confirmar contraseña</label>
        <input type="password" id="clave2" v-model="form.clave2" required minlength="6"
               placeholder="Escribe nuevamente la contraseña"
               :class="{ invalido: errores.clave2 }" @input="validar('clave2')" />
        <small v-if="errores.clave2" class="error-texto">{{ errores.clave2 }}</small>

        <label>
          <input type="checkbox" v-model="form.terminos" @change="validar('terminos')" />
          Acepto los <a href="#"><strong>términos y condiciones</strong></a>
        </label>
        <small v-if="errores.terminos" class="error-texto">{{ errores.terminos }}</small>

        <button type="submit" class="btn">Crear cuenta</button>
      </form>

      <p v-if="mensaje" class="alerta mostrar ok">{{ mensaje }}</p>
    </section>
  </main>
</template>