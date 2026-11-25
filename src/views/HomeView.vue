<template>
  <section class="hero">
    <h1>Bienvenido a Agrofinca</h1>
    <p>Productos frescos del campo a tu mesa. Verduras, frutas, lácteos y granos cultivados con cariño.</p>
    <RouterLink to="/catalogo" class="btn">Ver catálogo</RouterLink>
  </section>

  <section class="info">
    <article>
      <h2>Frescura garantizada</h2>
      <p>Cosechamos y vendemos directamente, sin intermediarios.</p>
    </article>
    <article>
      <h2>Precios justos</h2>
      <p>Del productor al consumidor, a un precio que beneficia a todos.</p>
    </article>
    <aside>
      <h2>¿Eres productor?</h2>
      <p>Registra tus productos y empieza a vender.</p>
      <RouterLink to="/registro">Registrar producto</RouterLink>
    </aside>
  </section>
</template>
