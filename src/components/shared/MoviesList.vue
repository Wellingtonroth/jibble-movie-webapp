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
      <div class="movies-list__item-info-container">
        <span class="movies-list__item-id">
          id: {{ movie.imdbID }}
        </span>
        <span class="movies-list__item-year">
          {{ movie.Year }}
        </span>
      </div>
      <FavoriteButton
        :is-favorite-movie="isFavoriteMovie"
        @isFavorite="handleToggleFavorite(movie)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import FavoriteButton from './FavoriteButton.vue';
import useFavorites from '@/composables/useFavorites';
import type { Movie } from '@/types/movie';

const { movie } = defineProps<{
  movie: Movie
}>();

const { isFavorite, toggleFavorite } = useFavorites();

const isFavoriteMovie = computed<boolean>(() => isFavorite(movie.imdbID));

const handleToggleFavorite = (movie: Movie): void => {
  toggleFavorite(movie);
};
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
    margin-right: 4px;

    @media (max-width: 768px) {
      font-size: 14px;
      margin-left: 10px;
    }
  }

  &__item-info {
    display: flex;
    align-items: center;
    gap: 10px;

    @media (max-width: 768px) {
      font-size: 14px;
    }
  }

  &__item-info-container {
    display: flex;
  }

  &__item-year {
    font-size: 14px;
    font-weight: 600;
    color: #666;
    padding-bottom: 2px;
    border-bottom: 1px solid #666;
    cursor: default;
  } 

  &__item-id {
    font-size: 13px;
    color: #666;
    width: max-content;
    margin-right: 10px;
    cursor: default;
  }
}
</style>
