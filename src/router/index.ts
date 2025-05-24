import { createRouter, createWebHistory } from 'vue-router';
import FavoritesView from '../views/FavoritesView.vue'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'HomeView',
    component: HomeView,
  },
  {
    path: '/favorites',
    name: 'FavoritesView',
    component: FavoritesView,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;