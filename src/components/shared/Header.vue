<template>
  <header>
    <ul>
      <li>
        <router-link to="/">Movies List</router-link>
      </li>
      <li>
        <router-link to="/favorites">Favorites</router-link>
      </li>
    </ul>
  </header>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<style scoped lang="scss">
header {
  padding: 20px;
}
</style>

