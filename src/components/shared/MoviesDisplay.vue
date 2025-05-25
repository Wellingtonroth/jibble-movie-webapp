<template>
  <div class="movies-display">
    <div class="movies-display__header">
      <button 
        v-for="option in DISPLAY_OPTIONS" 
        :key="option.value" 
        @click="handleDisplayTypeChange(option.value)"
        :class="{ 'active': displayType === option.value }"
      >
        <Icon :icon="option.icon" width="16" height="16" />
      </button>
    </div>

    <LoadingSpinner 
      v-if="isLoading" 
      message="Loading movies..."
      :overlay="true"
    />

    <div v-else>
      <EmptyState
        v-if="!data.length"
        title="No movies found"
        description="Try searching for a different movie or check your search term"
      />
      <div class="movies-cards" v-else-if="displayType === DisplayType.GRID">
        <MovieCard 
          v-for="(movie, index) in data" 
          :key="movie.imdbID" 
          :movie="movie"
          :index="index"
          @toggle-favorite="handleToggleFavorite"
        />
      </div>
      <div class="movies-list" v-else>
        <MoviesList 
          v-for="(movie, index) in data" 
          :key="movie.imdbID" 
          :movie="movie"
          :index="index"
        />
      </div>
    </div>
  </div>

  <Pagination
    v-if="totalPages > 1"
    :total-pages="totalPages"
    :current-page="currentPage"
    @current-page="handleCurrentPageChange"
  />
</template>

<script setup lang="ts">
import MovieCard from '@/components/shared/MovieCard.vue';
import MoviesList from '@/components/shared/MoviesList.vue';
import EmptyState from '@/components/shared/EmptyState.vue';
import LoadingSpinner from '@/components/shared/LoadingSpinner.vue';
import Pagination from '@/components/shared/Pagination.vue';
import useMovies from '@/composables/useMovies';
import useFavorites from '@/composables/useFavorites';
import { DISPLAY_OPTIONS, DisplayType } from '@/constants/display';
import { Icon } from '@iconify/vue';
import type { Movie } from '@/types/movie';

const { 
  data, 
  isLoading,
  totalPages,
  currentPage,
} = defineProps<{
  data: Movie[],
  isLoading: boolean,
  totalPages: number,
  currentPage: number,
}>();

const { 
  displayType,
  setDisplayType,
  setCurrentPage,
} = useMovies();

const { 
  toggleFavorite,
} = useFavorites();

const handleDisplayTypeChange = (type: DisplayType): void => {
  setDisplayType(type);
};

const handleToggleFavorite = (movie: Movie): void => {
  toggleFavorite(movie);
};

const handleCurrentPageChange = (page: number): void => {
  setCurrentPage(page);
};
</script>

<style scoped lang="scss">
.movies-display {
  width: 100%;
}

.movies-cards {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
}

.movies-display__header {
  display: flex;
  gap: 10px;
  margin: 30px 0;

  button {
    padding: 6px 10px;
    border: none;
    border-radius: 5px;
    background-color: #f0f0f0;
  }

  .active {
    background-color: #007bff;
    color: #fff;
  }
}
</style>
