<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/favorites">Favorites</RouterLink>
    </nav>
  </header>

  <RouterView />
</template>

<style scoped lang="scss">
header {
  background-color: #2c3e50;
  padding: 1rem;
  margin-bottom: 2rem;

  nav {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    gap: 1rem;

    a {
      color: white;
      text-decoration: none;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      transition: background-color 0.3s;

      &:hover {
        background-color: #34495e;
      }

      &.router-link-active {
        background-color: #34495e;
      }
    }
  }
}
</style>
