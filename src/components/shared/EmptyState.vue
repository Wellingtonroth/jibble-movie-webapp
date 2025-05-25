<template>
  <div class="empty-state">
    <Icon 
      icon="mdi:movie-search" 
      class="empty-state__icon"
      width="54"
      height="54"
    />
    <h3 class="empty-state__title">
      {{ title }}
    </h3>
    <p class="empty-state__description">
      {{ description }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue';

const { title = 'Loading...', description = 'Please wait...' } = defineProps<{
  title?: string,
  description?: string,
}>();
</script>

<style scoped lang="scss">
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  text-align: center;

  &__icon {
    color: #666;
    margin-bottom: 16px;
  }

  &__title {
    font-size: 16px;
    color: #333;
    margin-bottom: 8px;
  }

  &__description {
    font-size: 14px;
    color: #666;
  }
}
</style> 