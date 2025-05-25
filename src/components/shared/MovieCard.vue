<template>
  <div class="movie-card">
    <div class="movie-card__image">
      <img 
        src="https://placehold.co/600x400" 
        :alt="movie.Title" 
      />
      <div class="movie-card__favorite">
        <FavoriteButton
          :is-favorite-movie="isFavoriteMovie"
          @isFavorite="handleToggleFavorite(movie)"
        />
      </div>
    </div>
    <div class="movie-card__content">
      <h3 class="movie-card__title">
        {{ movie.Title }}
      </h3>
      <p class="movie-card__year">
        {{ movie.Year }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import FavoriteButton from './FavoriteButton.vue'
import useFavorites from '@/composables/useFavorites'
import type { Movie } from '@/types/movie'

const { movie } = defineProps<{
  movie: Movie
}>();

const { isFavorite, toggleFavorite } = useFavorites();

const isFavoriteMovie = computed<boolean>(() => isFavorite(movie.imdbID));

const handleToggleFavorite = (movie: Movie): void => {
  toggleFavorite(movie);
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
    position: relative;
  }

  &__favorite {
    position: absolute;
    bottom: 8px;
    right: 8px;
    z-index: 1;
  }

  &__content {
    padding: 16px;
    position: relative;
  }

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
}
</style> 