<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <section>
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
  </section>
</template>

<style scoped lang="scss">

</style>
