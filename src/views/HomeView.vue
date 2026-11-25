<template>
  <section class="hero">
    <img src="/img/hero.jpg" alt="Finca con ganado y camino de tierra" />
    <h1>Todo lo que tu campo <em>necesita</em> en un solo lugar.</h1>
    <p class="hero__texto">Vitaminas, alimentos, semillas y herramientas para tu ganado y tus cultivos.</p>
    <RouterLink to="/catalogo" class="btn">Ver productos</RouterLink>

    <aside class="beneficios" aria-label="Por qué elegirnos">
      <div><h2>Calidad</h2><p>Productos verificados y seleccionados</p></div>
      <div><h2>Soporte</h2><p>Asistencia en cada paso</p></div>
    </aside>
  </section>

  <section class="info" aria-label="Servicios y nosotros">
    <article class="info__card">
      <h2>Servicios</h2>
      <p>Asesoría en productos pecuarios, agrícolas y veterinarios, y atención para productores y propietarios de fincas.</p>
    </article>
    <article class="info__card">
      <h2>Nosotros</h2>
      <p>AGROFINCA comercializa productos para el cuidado de animales y cultivos en Sahagún, Córdoba.</p>
    </article>
  </section>
</template>
