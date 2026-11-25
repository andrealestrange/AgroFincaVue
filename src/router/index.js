import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CatalogView from '../views/CatalogView.vue'
import RegisterView from '../views/RegisterView.vue'
import DetailView from '../views/DetailView.vue'
import LoginView from '../views/LoginView.vue'
import CartView from '../views/CartView.vue'
import TerminosView from '../views/TerminosView.vue'
import PrivacidadView from '../views/PrivacidadView.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/catalogo', name: 'catalog', component: CatalogView },
    { path: '/registro', name: 'register', component: RegisterView },
    { path: '/producto/:id', name: 'detail', component: DetailView },
    { path: '/login', name: 'login', component: LoginView },
    { path: '/carrito', name: 'cart', component: CartView },
    { path: '/terminos', name: 'terminos', component: TerminosView },
    { path: '/privacidad', name: 'privacidad', component: PrivacidadView },
  ],
})


