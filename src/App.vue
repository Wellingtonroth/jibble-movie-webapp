<template>
  <section>
    <Header />
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
  </section>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import Header from '@/components/shared/Header.vue'
</script>

<style scoped lang="scss">
</style>
