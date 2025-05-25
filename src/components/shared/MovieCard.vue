<template>
  <div class="movie-card">
    <div class="movie-card__image">
      <img 
        src="https://placehold.co/600x400" 
        :alt="movie.Title" 
      />
    </div>
    <div class="movie-card__content">
      <!-- <span class="movie-card__count">
        {{ calculateCount }}
      </span> -->
      <h3 class="movie-card__title">
        {{ movie.Title }}
      </h3>
      <p class="movie-card__year">
        {{ movie.Year }}
      </p>
      <button
        @click="handleToggleFavorite"
        class="movie-card__favorite"
        :class="{ 'movie-card__favorite--active': isMovieFavorite }"
      >
        {{ isMovieFavorite ? 'Remove from Favorites' : 'Add to Favorites' }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import useFavorites from '@/composables/useFavorites'
// import useMovies from '@/composables/useMovies'
import type { Movie } from '@/types/movie'

const { movie, index } = defineProps<{
  movie: Movie,
  index: number,
}>()

const emit = defineEmits<{
  'toggle-favorite': [movie: Movie]
}>()

const { isFavorite } = useFavorites();
// const { currentPage } = useMovies()

const isMovieFavorite = computed<boolean>(() => isFavorite(movie.imdbID));

// const calculateCount = computed<number>(() => {
//   const itemsPerPage: number = 10;
//   return ((currentPage.value - 1) * itemsPerPage) + index + 1
// });

const handleToggleFavorite = (): void => {
  emit('toggle-favorite', movie);
};
</script>

<style lang="scss" scoped>
.movie-card {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
  max-width: 280px;
  max-height: 340px;

  &:hover {
    transform: translateY(-4px);
  }

  &__image {
    width: 100%;
    overflow: hidden;
  }

  &__content {
    padding: 16px;
    position: relative;
  }

  /* &__count {
    position: absolute;
    top: -12px;
    right: 16px;
    background-color: #dbec3a;
    color: #111;
    font-size: 12px;
    font-weight: 600;
    padding: 4px 8px;
    border-radius: 12px;
  } */

  &__title {
    margin: 0 0 8px;
    font-size: 14px;
    color: #2c3e50;
    line-height: 1.4;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    cursor: default;
  }

  &__year {
    margin: 0 0 16px;
    color: #666;
    font-size: 13px;
    font-weight: 600;
    padding-bottom: 2px;
    border-bottom: 1px solid #666;
    width: fit-content;
    cursor: default;
  }

  &__favorite {
    width: 100%;
    padding: 8px;
    background-color: #e9ff1a;
    color: #111;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 600;
    transition: background-color 0.2s;

    &:hover {
      background-color: #e7ff00;
    }

    &--active {
      background-color: #dc3545;

      &:hover {
        background-color: #c82333;
      }
    }
  }
}
</style> 