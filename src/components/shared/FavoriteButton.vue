<template>
  <button 
    class="favorite-button"
    :class="{ 'favorite-button--active': isFavoriteMovie }"
    @click="toggleFavorite"
  >
    <Icon 
      :icon="isFavoriteMovie ? 'mdi:heart' : 'mdi:heart-outline'" 
      class="favorite-button__icon"
      width="24"
      height="24"
    />
    <Icon 
      icon="mdi:heart-broken" 
      class="favorite-button__icon favorite-button__icon--broken"
      width="24"
      height="24"
    />
  </button>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue';

const { isFavoriteMovie } = defineProps<{
  isFavoriteMovie: boolean,
}>();

const emit = defineEmits<{
  'isFavorite': [value: boolean]
}>();

const toggleFavorite = (): void => {
  emit('isFavorite', !isFavoriteMovie);
};
</script>

<style lang="scss" scoped>
.favorite-button {
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  position: relative;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 40px;
  min-height: 40px;

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }

  &__icon {
    position: absolute;
    transition: all 0.3s ease;
    color: #666;

    &--broken {
      opacity: 0;
      transform: scale(0.8);
      color: #ff4444;
    }
  }

  &--active {
    .favorite-button__icon {
      color: #ff4444;
    }

    &:hover {
      .favorite-button__icon {
        opacity: 0;
        transform: scale(0.8);
      }

      .favorite-button__icon--broken {
        opacity: 1;
        transform: scale(1);
      }
    }
  }
}
</style> 