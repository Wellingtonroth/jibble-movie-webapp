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
  ul {
    display: flex;
    gap: 20px;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  a {
    text-decoration: none;
    color: #333;
    position: relative;
    font-size: 18px;
    font-weight: 600;
    
    &:hover {
      color: #007bff;
    }

    &.router-link-active {
      color: #007bff;
      
      &::after {
        content: '';
        position: absolute;
        bottom: -4px;
        left: 0;
        width: 100%;
        height: 2px;
        background-color: #007bff;
      }
    }
  }
}
</style>

