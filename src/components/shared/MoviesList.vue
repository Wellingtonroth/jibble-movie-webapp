<template>
  <div class="movies-list">
    <img 
      src="https://placehold.co/60x60" 
      :alt="movie.Title" 
    />
    <h3 class="movies-list__item-title">
      {{ movie.Title }}
    </h3>
    <div class="movies-list__item-info">
      <p class="movies-list__item-year">
        {{ movie.Year }}
      </p>
      <button class="movies-list__item-favorite">
        <Icon icon="mdi:heart" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Movie } from '@/types/movie'
import { Icon } from '@iconify/vue'

const { movie } = defineProps<{
  movie: Movie
}>()
</script>

<style scoped lang="scss">
.movies-list {
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 10px;
  border-radius: 10px;
  background-color: #f0f0f0;
  transition: background-color 0.3s ease;
  align-items: center;

  @media (max-width: 425px) {
    padding: 4px;
  }

  &:not(:last-child) {
    margin-bottom: 10px;
  }

  &:hover {
    background-color: #e0e0e0;
  }

  &__item-title {
    font-size: 18px;
    font-weight: 600;
    width: 100%;
    text-align: left;
    margin-left: 20px;

    @media (max-width: 768px) {
      font-size: 14px;
    }
  }

  &__item-info {
    display: flex;
    align-items: center;
    font-weight: 600;
    gap: 10px;

    @media (max-width: 768px) {
      font-size: 14px;
    }
  }

  &__item-favorite {
    background-color: transparent;
    border: none;
    cursor: pointer;
    min-width: 30px;
    min-height: 30px;
  }
}
</style>
