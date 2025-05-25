<template>
  <section>
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
  </section>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<style scoped lang="scss">
</style>
